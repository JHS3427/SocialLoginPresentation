import cityBikeImage from '../utils/cityBikeImage.js';

const imageKey = ["seoulBike"];
const imagePath = cityBikeImage[imageKey];

export function Maps({ data, onClose }) {
    if (!data) return null;
    
    console.log(data);
    
  return (
        <div className='map_marker_data_info'>
            <button className='map_marker_data_info_closs' onClick={onClose}>Closs</button>
            <h3>{data.name}</h3>
            <img
                className='map_marker_data_info_img'
                src={imagePath}
                alt="자전거 이미지"
            />
            <ul className='map_marker_data_info_list'>
                <li>
                    <span>위도: {data.latitude}</span>
                    <span>경도: {data.longitude}</span>
                </li>
                <li>
                    <p>자전거 수: {data.free_bikes}</p>
                </li>
                <li>
                    <p>빈 거치대: {data.empty_slots}</p>
                </li>
            </ul>
        </div>
    );
}