class SingleTask<Fn extends (...args: any[]) => void = (...args: any[]) => void> {
    // region 杂项
    // 执行间隔
    readonly #gap: number

    // 任务名
    readonly #taskName: string

    // 回调函数
    #fn: Fn | null
    // endregion

    // region 运行、停止、继续、取消
    // 实例的任务封装
    #task: ((t: number) => void) | null
    // requestAnimationFrame返回的id, 用于取消 若为null表示当前为停止状态
    #taskId: number | null = null
    // 上一次调用fn的时间 若为null表示当前为停止状态
    #last_t: number | null = null

    // 当前任务是否正在运行
    get ifRun() {
        return this.#last_t !== null
    }

    // endregion

    /**
     * @description
     * @param taskName 任务名, 若任务名已存在则会覆盖旧任务(旧任务停止并删除)
     * @param fn 任务回调
     * @param args 回调参数, 无参则传 `[]`
     * @param gap 执行间隔
     */
    constructor(taskName: string, fn: Fn, args: Parameters<Fn>, gap: number) {
        this.#taskName = taskName
        this.#fn = fn
        this.#gap = gap

        this.#task = (t) => {
            // 到达时间间隔则执行一次
            if(this.#last_t === null || (t - this.#last_t) >= this.#gap) {
                fn(...args)
                this.#last_t = t
            }

            if(!!this.#task) this.#taskId = requestAnimationFrame(this.#task)
        }
    }

    /**
     * @description 运行/继续
     */
    run() {
        // 当前任务存在 并且 当前为停止状态
        if(this.#task !== null && this.#last_t === null) {
            requestAnimationFrame(this.#task)
        }
    }

    /**
     * @description 暂停
     */
    pause() {
        if(this.#taskId !== null && this.#last_t !== null) {
            window.cancelAnimationFrame(this.#taskId)
            this.#taskId = null
            this.#last_t = null
        }
    }

    /**
     * @description 取消
     */
    cancel() {
        if(this.#taskId !== null) {
            window.cancelAnimationFrame(this.#taskId)
            this.#taskId = null
            this.#last_t = null
            this.#task = null
            this.#fn = null
        }
    }
}

class FrameTask {
    readonly #fps: number
    readonly #gap: number

    #tasks: Map<string, SingleTask> = new Map()

    /**
     * @param fps how many times the task should run in 1s.
     */
    constructor(fps: number = 60) {
        if(fps <= 0 || fps > 120) throw new Error('Invalid fps, available value is (0, 120].')

        this.#fps = fps
        this.#gap = 1000 / fps
    }

    // region 新增 运行 停止 删除
    /**
     * @description 新增任务
     * @param taskName 任务名, 若任务名已存在则会覆盖旧任务(旧任务停止并删除)
     * @param fn 任务回调
     * @param args 回调参数, 无参则传 `[]`
     * @param immediate 是否立即开始执行, 默认为`false`
     */
    addTask<Task extends (...args: any[]) => void>(taskName: string, fn: Task, args: Parameters<Task>, immediate: boolean = false) {
        // 如果已经注册过taskName, 覆盖并提示
        if(this.#tasks.has(taskName)) {
            this.#tasks.get(taskName)?.cancel()
            console.warn(`A task named [${ taskName }] has already been registered, the old task will be overwritten.`)
        }

        const newTask = new SingleTask(taskName, fn, args, this.#gap)
        this.#tasks.set(taskName, newTask)

        if(immediate) newTask.run()
    }

    /**
     * @description 开始/继续执行任务
     */
    runTask(taskName: string) {
        const task = this.#tasks.get(taskName)

        if(task === undefined) console.warn(`no task named [${ taskName }].`)
        else if(task.ifRun) console.warn(`the task named [${ taskName }] has already been running.`)
        else task.run()
    }

    /**
     * @description 停止任务
     */
    pauseTask(taskName: string) {
        const task = this.#tasks.get(taskName)

        if(task === undefined) console.warn(`no task named [${ taskName }].`)
        else if(!task.ifRun) console.warn(`the task named [${ taskName }] has already paused.`)
        else task.pause()
    }

    /**
     * @description 删除单个任务
     * @see cancelTask_with_expect
     * @see cancelTask_all
     * @param taskName 要删除的任务名
     */
    cancelTask_single(taskName: string) {
        const task = this.#tasks.get(taskName)

        if(task === undefined) console.warn(`no task named [${ taskName }].`)
        else {
            task.cancel()
            this.#tasks.delete(taskName)
        }
    }

    /**
     * @description 删除指定任务之外的全部任务
     * @see cancelTask_single
     * @see cancelTask_all
     * @param expect 要保留的任务名列表
     */
    cancelTask_with_expect(expect: string[]) {
        this.#tasks.forEach((task, taskName) => {
            if(!expect.includes(taskName)) {
                task.cancel()
                this.#tasks.delete(taskName)
            }
        })
    }

    /**
     * @description 删除全部任务
     * @see cancelTask_single
     * @see cancelTask_with_expect
     */
    cancelTask_all() {
        this.#tasks.forEach((task) => {
            task.cancel()
        })
        this.#tasks.clear()
    }

    // endregion

    // region 获取状态
    /**
     * @description 获取当前所有任务名
     */
    getState_name_list() {
        const task_name_list: string[] = []
        this.#tasks.forEach((task, taskName) => {
            task_name_list.push(taskName)
        })
        return task_name_list
    }

    /**
     * @description 获得指定任务的运行状态
     * @see getState_run_list
     * @return `null` 无此任务; `true` 正在运行; `false` 停止
     */
    getState_run(taskName: string) {
        if(!this.#tasks.has(taskName)) return null
        else return this.#tasks.get(taskName)!.ifRun
    }

    /**
     * @description 获取当前所有任务运行状态
     * @see getState_run
     */
    getState_run_list() {
        const task_name_list: { taskName: string, ifRun: boolean }[] = []
        this.#tasks.forEach((task, taskName) => {
            task_name_list.push({ taskName, ifRun: task.ifRun })
        })
        return task_name_list
    }

    // endregion

    /**
     * @description 注销事件管理, 即删除全部任务
     * @see cancelTask_all
     */
    dispose() {
        this.cancelTask_all()
    }
}

export default FrameTask