import { useEffect } from "react";

function Map({ handleClick }) {
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 중심 좌표
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);

        let imageSrc = 'http://localhost:3000/images/marker_green.png';    
        let imageSize = new window.kakao.maps.Size(15, 15);
        let imageOption = {offset: new window.kakao.maps.Point(0, 0)};
        let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

        // 마커 위치 및 타입 배열 (중복 입력 방식)
        const markerData = [
          { lat: 33.450701, lng: 126.570667, type: "coord" },
          { lat: 33.451701, lng: 126.571667, type: "coord" },
          { lat: 33.452701, lng: 126.572667, type: "coord" },
          // 추가로 원하는 만큼 마커 넣기 가능
        ];

        markerData.forEach(({ lat, lng, type }) => {
          const markerPosition = new window.kakao.maps.LatLng(lat, lng);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: markerImage,
            map: map,
          });

          window.kakao.maps.event.addListener(marker, "click", () => {
            handleClick(type);
          });
        });
      });
    }
  }, [handleClick]);


  return (
    <>
      <div className="map" id="map"></div>
    </>
  );
}

export default Map;