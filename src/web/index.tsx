import { CoffeeCalendar } from "./coffee-calendar";
import { registerReactWebComponent } from "./wc.util";

registerReactWebComponent({
  name: "coffee-calendar",
  attributes: ["height"],
  Component: CoffeeCalendar,
});
