class FrameTask {
    // region fps
    /**
     * @see fps
     * @private
     */
    #fps: number
    /**
     * @description how many times the task should run in 1s.
     * @description `fps(f/s) = 1_000 / gap(ms)`
     * @see gap
     * @default 60
     */
    get fps() {
        return this.#fps
    }

    set fps(val) {
        this.#fps = val
        this.#gap = 1000 / val
    }

    // endregion

    // region gap
    /**
     * @see gap
     * @private
     */
    #gap: number
    /**
     * @description gap between two run of the task.
     * @description `gap(ms) = 1_000 / fps(f/s)`
     * @see fps
     * @default 16.67 (1/60 * 1000)
     */
    get gap() {
        return this.#gap
    }

    set gap(val) {
        this.#gap = val
        this.#fps = 1000 / this.#gap
    }

    // endregion

    /**
     * @description 任务当前帧id列表
     * @private
     */
    #taskIds: Map<string, number> = new Map()

    /**
     * @description 任务运行状态
     * @private
     */
    #taskRun: Map<string, boolean> = new Map()

    /**
     * @param fps how many times the task should run in 1s.
     */
    constructor(fps: number = 60) {
        if(fps <= 0 || fps > 120) throw new Error('Invalid fps, available value is (0, 120].')

        this.#fps = fps
        this.#gap = 1000 / fps
    }

    /**
     * @description 构造一个新的任务
     * @param taskName 任务名, 若任务名已存在则会覆盖旧任务(旧任务自动取消)
     * @param fn 任务回调
     * @param args 回调参数, 无参则传 `[]`
     * @private
     */
    private taskGenerator<Fn extends (...args: any[]) => void>(taskName: string, fn: Fn, args: Parameters<Fn>) {
        let last_t: number | null = null

        const task = (t: number) => {
            // 暂停即不做任何操作
            let stat = this.#taskRun.get(taskName)
            if(!!stat) {
                if(last_t === null) last_t = t

                // 到达时间间隔则执行一次
                if((t - last_t) >= this.#gap) {
                    fn(...args)
                    last_t = t
                }
            }

            // 注册下一帧事件
            const taskId = requestAnimationFrame(task)
            // 更新循环 id
            this.#taskIds.set(taskName, taskId)
        }

        return task
    }

    // region 新增、运行、暂停、删除
    /**
     * @description 新增任务
     * @param taskName 任务名, 若任务名已存在则会覆盖旧任务(旧任务自动取消)
     * @param fn 任务回调
     * @param args 回调参数, 无参则传 `[]`
     * @param immediate 是否立即开始执行, 默认为`false`
     */
    addTask<Task extends (...args: any[]) => void>(taskName: string, fn: Task, args: Parameters<Task>, immediate: boolean = false) {
        // 如果已经注册过taskName, 覆盖并提示
        if(this.#taskIds.has(taskName)) {
            window.cancelAnimationFrame(this.#taskIds.get(taskName)!)
            console.warn(`A task named [${ taskName }] has already been registered, and the old task is overwritten.`)
        }

        this.#taskRun.set(taskName, immediate)

        const task = this.taskGenerator(taskName, fn, args)

        requestAnimationFrame(task)
    }

    /**
     * @description 开始/继续 执行任务
     * @param taskName 任务名
     */
    runTask(taskName: string) {
        if(!this.#taskRun.has(taskName)) {
            console.warn(`No task named ${ taskName } found, nothing will be executed.`)
        }
        else this.#taskRun.set(taskName, true)
    }

    /**
     * @description 暂停任务
     * @param taskName
     */
    pauseTask(taskName: string) {
        if(!this.#taskRun.has(taskName)) {
            console.warn(`No task named ${ taskName } found, nothing will be executed.`)
        }
        else this.#taskRun.set(taskName, false)
    }

    /**
     * @description 停止并删除指定任务
     * @see cancelExcept
     * @see cancelAll
     * @param taskName 任务名
     */
    cancelTask(taskName: string) {
        if(!this.#taskRun.has(taskName)) {
            console.warn(`No task named ${ taskName } found, nothing will be executed.`)
        }
        else {
            this.#taskRun.set(taskName, false)
            window.cancelAnimationFrame(this.#taskIds.get(taskName)!)
            this.#taskRun.delete(taskName)
            this.#taskIds.delete(taskName)
        }
    }

    /**
     * @description 停止并删除(除指定任务外的)所有任务
     * @see cancelTask
     * @see cancelAll
     * @param except 排除在外的任务
     */
    cancelExcept(except: string[] = []) {
        this.#taskRun.forEach((state, taskName) => {
            if(!except.includes(taskName)) {
                this.#taskRun.set(taskName, false)
                this.#taskRun.delete(taskName)
            }
        })
        this.#taskIds.forEach((taskId, taskName) => {
            if(!except.includes(taskName)) {
                window.cancelAnimationFrame(taskId)
                this.#taskIds.delete(taskName)
            }
        })
    }

    /**
     * @description 停止并删除全部任务
     * @see cancelTask
     * @see cancelExcept
     */
    cancelAll() {
        this.#taskRun.forEach((state, taskName) => {
            this.#taskRun.set(taskName, false)
        })
        this.#taskIds.forEach((taskId) => {
            window.cancelAnimationFrame(taskId)
        })
        this.#taskRun.clear()
        this.#taskIds.clear()
    }
    // endregion

    // region 获取状态
    /**
     * @description 获取当前的全部任务名
     * @see getTaskStates
     */
    getTaskNames() {
        const taskNames: string[] = []
        this.#taskIds.forEach((id, taskName) => {
            taskNames.push(taskName)
        })
        return taskNames
    }

    /**
     * @description 获取当前的全部任务状态
     * @see getTaskNames
     */
    getTaskStates() {
        const taskNames: { taskName: string, ifRun: boolean }[] = []
        this.#taskRun.forEach((ifRun, taskName) => {
            taskNames.push({ taskName, ifRun })
        })
        return taskNames
    }
    // endregion
}

export default FrameTask

/**
 * @description
 * 逐帧任务管理. 按照某一帧率执行回调, 支持多任务、添加、暂停、取消等.
 */