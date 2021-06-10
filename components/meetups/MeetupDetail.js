import classes from './MeetupDetail.module.css';
import Link from 'next/link';

const MeetupDetail = (props) => {
    return (
        <section className={ classes.detail }>
            <img src={ props.image } alt={ props.title } />
            <h1>{ props.title }</h1>
            <address>{ props.address }</address>
            <p>{ props.description }</p>
            <div className={ classes.actions }>
                <Link href="/">Back</Link>
            </div>
        </section>
    );
}

export default MeetupDetail;