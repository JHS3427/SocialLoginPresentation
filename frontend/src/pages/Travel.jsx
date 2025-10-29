import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from 'react';
import { TravelMenu } from "../components/commons/TravelMenu.jsx";
import { TravelFood } from "../components/commons/TravelFood.jsx";
import { TravelWalk } from "../components/commons/TravelWalk.jsx";
import Map from '../components/commons/Map.jsx';
import { getTravelMenuList } from '../feature/travel/travelMenuAPI.js';
import { getTravelFoodList } from '../feature/travel/travelFoodAPI.js';
import { getTravelWalkList } from '../feature/travel/travelWalkAPI.js';

export function Travel() {
    const dispatch = useDispatch();
    const travelMenuList = useSelector((state) => state.travelMenu.travelMenuList);
    const travelFoodList = useSelector((state) => state.travelFood.travelFoodList);
    const travelWalkList = useSelector((state) => state.travelWalk.travelWalkList);

    console.log(travelMenuList);
    console.log(travelFoodList);
    console.log(travelWalkList);

    const [number, setNumber] = useState(3);
  
    useEffect(() => {
            dispatch(getTravelMenuList(number));
            dispatch(getTravelFoodList(number));
            dispatch(getTravelWalkList(number));
    }, [number]);

    // 버튼들 보이기/숨기기 상태 관리
    const [showMenus, setShowMenus] = useState(false);
    const [showFoods, setShowFoods] = useState(false);
    const [showWalks, setShowWalks] = useState(false);

    const handleClick = (type) => {
        console.log(type);
        
        if(type === "coord"){
          setShowMenus(true); // 버튼들 보이게 상태 변경
        }

        if(type === "food") {
          setShowFoods(true); // 음식들 보이게 상태 변경
          setShowWalks(false);
        }else if(type === "walk"){
          setShowWalks(true); // 산책로들 보이게 상태 변경
          setShowFoods(false); 
        }
        
    }
    
    return(
        <div className="content">
            <div className="center-layout travel-form">
                <div className="travel-left">
                    <nav className="travel-left-menus">
                        {/* showMenus가 true일 때만 버튼 보이기 */}
                        {showMenus && (
                          <>
                            {travelMenuList && travelMenuList.map((rowArray, idx) =>
                                { return rowArray && rowArray.map((travelMenu, idx) =>                 
                                    <TravelMenu name={travelMenu.name} type={travelMenu.type} handleClick={handleClick} key={idx} />
                                )}
                            )}                     
                          </>
                        )}
                    </nav>
                    <div className="travel-left-detail">
                        {/* showFoods, showWalks가 true일 때만 버튼 보이기 */}
                        {showFoods && (
                          <div className='food-list'>
                            {travelFoodList && travelFoodList.map((rowArray, idx) =>
                                { return rowArray && rowArray.map((travelFood, idx) =>          
                                  <TravelFood pid={travelFood.pid} name={travelFood.name} like={travelFood.like} tag={travelFood.tag} image1={travelFood.image1} image2={travelFood.image2} image3={travelFood.image3} description={travelFood.description} /> 
                               )}
                            )}                              
                          </div>
                        )}
                        {showWalks && (
                          <ul className='walk-list'>
                            {travelWalkList && travelWalkList.map((rowArray, idx) =>
                                { return rowArray && rowArray.map((travelWalk, idx) =>          
                                  <TravelWalk pid={travelWalk.pid} name={travelWalk.name} like={travelWalk.like} distance={travelWalk.distance} image1={travelWalk.image1} image2={travelWalk.image2} image3={travelWalk.image3} description={travelWalk.description} /> 
                               )}
                            )}    
                          </ul>
                        )}
                    </div>
                </div>
                <div className="travel-map">
                    <Map handleClick={handleClick} />                    
                </div>
            </div>
        </div>
    );
}