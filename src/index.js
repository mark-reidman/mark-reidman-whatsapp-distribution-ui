import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-svg.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-pro/css/all.css";
import "assets/scss/argon-design-system.scss?v1.0.0";

import Index from "views/Index.js";
import Sections from "views/Sections.js";
import CampaignList from "views/CampaignList.js";
import CampaignStat from 'views/CampaignStat.js';
import LeadReview from 'views/LeadReview.js';
import Presentation from "views/Presentation.js";
import AboutUs from "views/examples/AboutUs.js";
import MainPage from "views/examples/MainPage";
import AccountSettings from "views/examples/AccountSettings.js";
import BlogPost from "views/examples/BlogPost.js";
import BlogPosts from "views/examples/BlogPosts.js";
import ChatPage from "views/examples/ChatPage.js";
import CheckoutPage from "views/examples/CheckoutPage.js";
import ContactUs from "views/examples/ContactUs.js";
import Ecommerce from "views/examples/Ecommerce.js";
import Error from "views/examples/Error.js";
import Error500 from "views/examples/Error500.js";
import InvoicePage from "views/examples/InvoicePage.js";
import LandingPage from "views/examples/LandingPage.js";
import LoginPage from "views/examples/LoginPage.js";
import PricingPage from "views/examples/PricingPage.js";
import ProductPage from "views/examples/ProductPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import ResetPage from "views/examples/ResetPage.js";
import Login from "views/login/Login.js"
import LoginView from "views/login/LoginView.js"

import NewCampaign from 'views/NewCampaign.js'
import {AuthContextProvider} from 'oath/AuthContext.js'
import InviteLink from 'views/InviteLink.js'


ReactDOM.render(
  <AuthContextProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact render={(props) => <LoginView {...props} />} />
        
        {/* <Route path="/index" exact render={(props) => <Index {...props} />} /> */}

        <Route
          path="/sections"
          exact
          render={(props) => <Sections {...props} />}
        />
        {/* <Route
          path="/campaigns"
          exact
          render={(props) => <CampaignList {...props} />}
        /> */}

        <Route
          path="/campaign/statistics"
          exact
          render={(props) => <CampaignStat {...props} />}
        />
        
        <Route
          path="/new-campaign"
          exact
          render={(props) => <NewCampaign {...props} />}
        />
        <Route
          path="/review"
          exact
          render={(props) => <LeadReview {...props} />}
        />
        <Route
          path="/share/:id"
          exact
          render={(props) => <InviteLink {...props} />}
        />
        {/* <Route
          path="/presentation"
          exact
          render={(props) => <Presentation {...props} />}
        />
        <Route
          path="/about-us"
          exact
          render={(props) => <AboutUs {...props} />}
        />
        <Route
            path="/main-page"
            exact
            render={(props) => <MainPage {...props} />}
        />
        <Route
          path="/account-settings"
          exact
          render={(props) => <AccountSettings {...props} />}
        />
        <Route
          path="/blog-post"
          exact
          render={(props) => <BlogPost {...props} />}
        />
        <Route
          path="/blog-posts"
          exact
          render={(props) => <BlogPosts {...props} />}
        />
        <Route
          path="/chat-page"
          exact
          render={(props) => <ChatPage {...props} />}
        />
        <Route
          path="/checkout-page"
          exact
          render={(props) => <CheckoutPage {...props} />}
        />
        <Route
          path="/contact-us"
          exact
          render={(props) => <ContactUs {...props} />}
        />
        <Route
          path="/ecommerce"
          exact
          render={(props) => <Ecommerce {...props} />}
        />
        <Route path="/error" exact render={(props) => <Error {...props} />} />
        <Route
          path="/error-500"
          exact
          render={(props) => <Error500 {...props} />}
        />
        <Route
          path="/invoice-page"
          exact
          render={(props) => <InvoicePage {...props} />}
        />
        <Route
          path="/landing-page"
          exact
          render={(props) => <LandingPage {...props} />}
        />
        <Route
          path="/login-page"
          exact
          render={(props) => <LoginPage {...props} />}
        />
        <Route
          path="/pricing-page"
          exact
          render={(props) => <PricingPage {...props} />}
        />
        <Route
          path="/product-page"
          exact
          render={(props) => <ProductPage {...props} />}
        />
        <Route
          path="/profile-page"
          exact
          render={(props) => <ProfilePage {...props} />}
        />
        <Route
          path="/register-page"
          exact
          render={(props) => <RegisterPage {...props} />}
        />
        <Route
          path="/reset-page"
          exact
          render={(props) => <ResetPage {...props} />}
        /> */}

        {/* <Redirect to="/presentation" /> */}
        <Redirect to="/Login" />
        
      </Switch>
    </BrowserRouter>
  </AuthContextProvider>
  ,
  document.getElementById("root")
);
