export class Order {
    constructor(
        public company: string,
        public quantity: number,
        public price: number,
        public type: 'buy' | 'sell'
    ) {}
}

export class MaxHeap {
    private heap: Order[] = [];

    insert(order: Order) {
        this.heap.push(order);
        this.heapifyUp();
    }

    extractMax(): Order | null {
        if (this.heap.length == 0) return null;
        const max = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0 && end) {
            this.heap[0] = end;
            this.heapifyDown();
        }
        return max;
    }

    peek(): Order | null {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    private heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex].price >= this.heap[index].price) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    private heapifyDown() {
        let index = 0;
        const length = this.heap.length;
        while (true) {
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            let largest = index;

            if (leftChild < length && this.heap[leftChild].price > this.heap[largest].price) {
                largest = leftChild;
            }
            if (rightChild < length && this.heap[rightChild].price > this.heap[largest].price) {
                largest = rightChild;
            }
            if (largest == index) break;

            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            index = largest;
        }
    }
}

export class MinHeap {
    private heap: Order[] = [];

    insert(order: Order) {
        this.heap.push(order);
        this.heapifyUp();
    }

    extractMin(): Order | null {
        if (this.heap.length === 0) return null;
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0 && end) {
            this.heap[0] = end;
            this.heapifyDown();
        }
        return min;
    }

    peek(): Order | null {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    private heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex].price <= this.heap[index].price) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    private heapifyDown() {
        let index = 0;
        const length = this.heap.length;
        while (true) {
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            let smallest = index;

            if (leftChild < length && this.heap[leftChild].price < this.heap[smallest].price) {
                smallest = leftChild;
            }
            if (rightChild < length && this.heap[rightChild].price < this.heap[smallest].price) {
                smallest = rightChild;
            }
            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}

