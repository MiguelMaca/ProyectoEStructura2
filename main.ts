import { StockMarketSimulator } from "./stock";
import { Order } from "./heap";

let simulator = new StockMarketSimulator();

// Colocando órdenes de compra y venta
simulator.placeOrder(new Order('Compañia A', 100, 50, 'comprar'));
simulator.placeOrder(new Order('Compañia A', 50, 45, 'vender'));
simulator.placeOrder(new Order('Compañia A', 60, 48, 'comprar'));
simulator.placeOrder(new Order('Compañia A', 30, 47, 'vender'));

// Mostrando el historial de transacciones
console.log(simulator.getTransactionHistory());
