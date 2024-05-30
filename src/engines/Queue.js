export class Queue {
    constructor(max = 1) {
        // Current task list
        this.list = [];
        // Indicate whether task queue running
        this.isRunning = false;
        this.max = max;
    }

    /**
     * Add new task for executing
     * @param {() => Promise<void>} task
     */
    push(task) {
        this.list.push(task);
        if (!this.isRunning) {
            this.do();
        }
    }

    /**
     * Execute a batch of tasks
     * @returns {Promise<void>}
     */
    async do() {
        // If list is empty, end run
        if (this.list.length === 0) {
            this.isRunning = false;
            return;
        }

        this.isRunning = true;
        const takeList = [];
        for (let i = 0; i < this.max; i++) {
            const task = this.list.shift();
            if (task) {
                takeList.push(task);
            }
        }

        // Execute all task
        const runningList = takeList.map((task) => task());
        await Promise.all(runningList);

        // Execute next batch
        await this.do();
    }
}
