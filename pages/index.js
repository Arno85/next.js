import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';

const Home = (props) => {
    return (
        <Fragment>
            <Head>
                <title>NextJS Meetups</title>
                <meta name="description" content="Browse a huge list of highly active NextJS meetups" />
            </Head>
            <MeetupList meetups={ props.meetups } />
        </Fragment>
    );
}

// SSG
export async function getStaticProps() {

    const client = await MongoClient.connect(process.env.API_URL);
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 10
    };
}

// SSR
// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     // fetch data from an API
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export default Home;