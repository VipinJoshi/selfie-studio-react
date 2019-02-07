import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./home";
import Selfie from "./takeyourphoto";

/*import NotFoundPage from "./NotFoundPage";
        <Route exact path="/:unfoundLocation" component={NotFoundPage} />

*/

const Router = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/take-my-pic" exact component={Selfie} />
      </Switch>
    </BrowserRouter>
  </div>
);
export default Router;
