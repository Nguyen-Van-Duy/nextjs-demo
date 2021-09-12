import {MongoClient} from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        // const { title, image, address, description} = data;

        const client = await MongoClient.connect('mongodb+srv://duy1506:8aekmWYNOO099aTd@cluster0.evptf.mongodb.net/meetups?retryWrites=true&w=majority')
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();
        // mã phản hồi.json để chuẩn bị dữ liệu phản hồi đi
        res.status(201).json({ message: 'Meetup inserted'});
    }
}

export default handler;