import MeetupDetail from '../../components/meetups/MeetupDetail';
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';

const Meetup = (props) => {
    return (
        <Fragment>
            <Head>
                <title>{ props.meetup.title }</title>
                <meta name="description" content={ props.meetup.description } />
            </Head>
            <MeetupDetail
                image={ props.meetup.image }
                title={ props.meetup.title }
                address={ props.meetup.address }
                description={ props.meetup.description }
            />
        </Fragment>
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(process.env.API_URL);
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => ({
            params: {
                meetupId: meetup._id.toString()
            }
        }))
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect(process.env.API_URL);
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
    console.log(meetup);

    client.close();

    return {
        props: {
            meetup: {
                id: meetup._id.toString(),
                title: meetup.title,
                image: meetup.image,
                description: meetup.description,
            }
        }
    }
}

export default Meetup;