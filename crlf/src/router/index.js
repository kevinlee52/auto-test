import routes from "./routes";
import { Suspense } from "react";
import { Routes, Route, useNavigate, useLocation, useParams, useSearchParams } from "react-router-dom";

// permission & login status check, pass props, make compatiable with class component
const Element=function(props){
    let {component: Component} = props;
    const navigate = useNavigate(),
        location = useLocation(),
        params = useParams(),
        [usp] = useSearchParams();

    return <Component navigate={navigate} location={location} params={params} usp={usp}/>
}

// create routes recursively
const createRoutes = function (routes){
    return <>
        {routes.map((item,index)=>{
            let {path, children} = item;
            return <Route key={index} path={path} element={<Element {...item}/>}>
                {Array.isArray(children)?createRoutes(children):null}
            </Route>
        })}
    </>
}


// you can use this <RouteVIew /> to replace entire <Routes> blocks in App.jsx
export default function RouteView(){
    return <Suspense fallback={<>Loading</>}>
        <Routes>
            {createRoutes(routes)}
        </Routes>
    </Suspense>
};

// create your own withRouter
export const withRouter = function(Component){
    return function HOC(props){
        const navigate = useNavigate(),
        location = useLocation(),
        params = useParams(),
        [usp] = useSearchParams();
        return <Component {...props} navigate={navigate} location={location} params={params} usp={usp} />
    }
}