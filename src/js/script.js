import initSliders from './modules/slider';
import initMenu from './modules/menu';
import initModals from "./modules/modal"
import renderPlants from "./modules/plant_service";
import initCart, {initPurchasingButtons} from "./modules/сart_service";

renderPlants()
initCart()
initPurchasingButtons()
initSliders()
initMenu()
initModals()
