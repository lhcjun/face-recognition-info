export const calculateFaceFrame = face => {
    return(
        face.map(eachFaceInfo => {
            const location = eachFaceInfo.region_info.bounding_box;
            const image = document.querySelector('#inputImg');
            const width = Number(image.width);
            const height = Number(image.height);
            return {
                leftCol: location.left_col * width,
                topRow: location.top_row * height,
                rightCol: width - (location.right_col * width),
                bottomRow: height - (location.bottom_row * height)
            }
        })
    );
}