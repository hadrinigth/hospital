import { Schema, model, Model, connection } from 'mongoose';
import { mongoConnect } from '../database/mongo';
mongoConnect();// conexao com o banco


type attendentType = { // TODO MODELO BASE VAI ADD MAIS DETALHES
    infos: {
        name: string,
        email: string,
        password: string,
    }
};

const schema = new Schema<attendentType>(
    {
        infos: {
            name: { type: String, required: true },
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true }
        },
    },
    { collection: 'attendent' }

);

const modelName: string = 'attendent'

export default connection && connection.models[modelName]
	? (connection.models[modelName] as Model<attendentType>)
	: model<attendentType>(modelName, schema);
