import { registerReactWebComponent } from "./wc.util";
import { CoffeeCalendar } from "./calendar/coffee-calendar";
// import {CoffeeSwagger} from "./swagger/swagger";

registerReactWebComponent({
  name: "coffee-calendar",
  attributes: ["height"],
  Component: CoffeeCalendar,
});

// TODO Fix Swagger
// registerReactWebComponent({
//   name: "coffee-swagger",
//   Component: CoffeeSwagger,
// });
