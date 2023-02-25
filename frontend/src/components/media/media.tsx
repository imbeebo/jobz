import { useEffect, useState } from "react";
import RestService from "../../rest/rest-service";
import MediaTable, { MediaObject } from "./media-table";
import UploadFile from "./upload-file";

const Media = () => {

    const service = new RestService();
    const [media, setMedia] = useState<Array<MediaObject>>();

    useEffect(() => fetchMedia(), [])

    return (<>
        <UploadFile refresh={fetchMedia} />
        <MediaTable media={media} />
    </>);

    function fetchMedia() {
        service.getMedia()
            .then(v => setMedia(v));
    }
};
export default Media;