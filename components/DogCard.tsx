import {Fragment} from "react";


interface Props {
    title: string;
    image: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}
const DogCard = ({ title, image, slug, location, date, time }: Props) => {
    return (
        <Fragment>
            Image and Text
        </Fragment>
    )

}
export default DogCard
