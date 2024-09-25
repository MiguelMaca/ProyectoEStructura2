import { Order } from "./heap";
import { MaxHeap } from "./heap";
import { MinHeap } from "./heap";

export class StockMarketSimulator {
    private buyOrders: MaxHeap = new MaxHeap();
    private sellOrders: MinHeap = new MinHeap();
    private transactionHistory: { company: string, quantity: number, price: number, buyerPrice: number, sellerPrice: number }[] = [];

    // Coloca una orden en el mercado
    placeOrder(order: Order) {
        if (order.type == 'comprar') {
            this.buyOrders.insert(order);
        } else {
            this.sellOrders.insert(order);
        }
        this.matchOrders();
    }

    // Empareja órdenes de compra y venta cuando es posible
    private matchOrders() {
        let buyOrder = this.buyOrders.peek();
        let sellOrder = this.sellOrders.peek();

        while (buyOrder && sellOrder && buyOrder.price >= sellOrder.price) {
            const quantityTraded = Math.min(buyOrder.quantity, sellOrder.quantity);
            const transactionPrice = (buyOrder.price + sellOrder.price) / 2;  // Precio promedio

            // Registra la transacción
            this.recordTransaction(buyOrder, sellOrder, quantityTraded, transactionPrice);

            // Actualiza la cantidad de las órdenes restantes
            buyOrder.quantity -= quantityTraded;
            sellOrder.quantity -= quantityTraded;

            // Elimina las órdenes completas
            if (buyOrder.quantity == 0) this.buyOrders.extractMax();
            if (sellOrder.quantity == 0) this.sellOrders.extractMin();

            // Verifica si aún hay más órdenes para emparejar
            buyOrder = this.buyOrders.peek();
            sellOrder = this.sellOrders.peek();
        }
    }

    // Registra la transacción en el historial
    private recordTransaction(buyOrder: Order, sellOrder: Order, quantity: number, price: number) {
        this.transactionHistory.push({
            company: buyOrder.company,
            quantity: quantity,
            price: price,
            buyerPrice: buyOrder.price,
            sellerPrice: sellOrder.price
        });

        console.log(`Transacción: Compañía ${buyOrder.company}, Cantidad ${quantity}, Precio ${price}`);
    }

    // Obtiene el historial de transacciones
    getTransactionHistory() {
        return this.transactionHistory.map((transaction, index) => 
            `Transacción ${index + 1}: Compañía: ${transaction.company}, Cantidad: ${transaction.quantity}, Precio final: ${transaction.price}, Precio comprador: ${transaction.buyerPrice}, Precio vendedor: ${transaction.sellerPrice}`
        ).join('\n');
    }
}
