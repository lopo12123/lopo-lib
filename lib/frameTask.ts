class FrameTask {
    // fps
    fps: number
    // 1 / fps
    gap: number
    // requestAnimationFrame 返回的 id, 用于取消事件循环
    taskIds: Map<string, number> = new Map()

    taskRun: Map<string, boolean> = new Map()

    constructor(fps: number = 60) {
        if(fps <= 0 || fps > 120) throw new Error('Invalid fps, available value is (0, 120].')

        this.fps = fps
        this.gap = 1 / fps
    }

    private taskGenerator<Fn extends (...args: any[]) => void>(taskName: string, fn: Fn, args: Parameters<Fn>) {
        let last_t: number | null = null

        const task = (t: number) => {
            // 暂停即不做任何操作
            if(!!this.taskRun.get(taskName)) {
                if(last_t === null) last_t = t

                // 到达时间间隔则执行一次
                if((t - last_t) >= this.gap) {
                    fn(...args)
                    last_t = t
                }
            }

            // 注册下一帧事件
            const taskId = requestAnimationFrame(task)
            // 更新循环 id
            this.taskIds.set(taskName, taskId)
        }

        return task
    }

    addTask<Task extends (...args: any[]) => void>(taskName: string, fn: Task, args: Parameters<Task>, immediate: boolean = true) {
        // 如果已经注册过taskName, 覆盖并提示
        if(this.taskIds.has(taskName)) {
            window.cancelAnimationFrame(this.taskIds.get(taskName)!)
            console.warn(`A task named [${ taskName }] has already been registered, and the old task is overwritten.`)
        }

        this.taskRun.set(taskName, immediate)

        const task = this.taskGenerator(taskName, fn, args)

        if(immediate) requestAnimationFrame(task)
    }

    pauseTask(taskName: string) {
        this.taskRun.set(taskName, false)
    }

    continueTask(taskName: string) {
        this.taskRun.set(taskName, true)
    }

    cancelTask(taskName: string) {
        this.taskRun.set(taskName, false)
        window.cancelAnimationFrame(this.taskIds.get(taskName)!)
        this.taskRun.delete(taskName)
        this.taskIds.delete(taskName)
    }

    cancelAllTask() {
        this.taskRun.forEach((state, taskName) => {
            this.taskRun.set(taskName, false)
        })
        this.taskIds.forEach((taskId, taskName) => {
            window.cancelAnimationFrame(taskId)
        })
        this.taskRun.clear()
        this.taskIds.clear()
    }

    dispose() {
        this.cancelAllTask()
    }
}

export default FrameTask

/**
 * @description
 * 逐帧任务管理. 按照某一帧率执行回调, 支持多任务、添加、暂停、取消等.
 */