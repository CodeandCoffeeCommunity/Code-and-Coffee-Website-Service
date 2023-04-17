import React from "react";
import SwaggerUI from "swagger-ui-react";
import SwaggerStyle from "swagger-ui-react/swagger-ui.css?inline";
import SwaggerSpec from "./swagger.yaml?raw";

export function CoffeeSwagger() {
  console.log(SwaggerSpec);
  return [
    <style key={0}>{SwaggerStyle}</style>,
    <SwaggerUI key={1} spec={SwaggerSpec} />,
  ];
}
