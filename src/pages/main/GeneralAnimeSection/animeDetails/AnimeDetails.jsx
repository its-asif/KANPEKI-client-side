import { useParams } from "react-router-dom";

const AnimeDetails = () => {
    const { id } = useParams();
    return (
        <div>
            the id is {id}
        </div>
    );
};

export default AnimeDetails;