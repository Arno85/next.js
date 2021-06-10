import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Fragment } from 'react';

const NewMeetup = () => {
    const router = useRouter();

    const addMeetupHandler = async (enteredMeetup) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetup),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        await response.json();

        router.replace('/');
    }

    return (
        <Fragment>
            <Head>
                <title>Add a New Meetup</title>
                <meta name="description" content="Add your own meetups" />
            </Head>
            <NewMeetupForm onAddMeetup={ addMeetupHandler } />
        </Fragment>
    );
}

export default NewMeetup;