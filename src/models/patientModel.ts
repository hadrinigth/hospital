import { Schema, model, Model, connection } from 'mongoose';
import { mongoConnect } from '../database/mongo';
mongoConnect();

type PatientType = {
	infos: {
		name: string;
		age: number;
		sus: number;
		entry: Date;
	};
	symptoms: {
		diabetes: boolean;
		pressure: {
			type: string;
			enum: ['alta', 'baixa', 'normal'];
		};
		allergies: [string];
	};
	diagnosis: {
		dengue: boolean;
		covid: boolean;
		lombriga: boolean;
	};
	uti: boolean;
};

const schema = new Schema<PatientType>(
	{
		infos: {
			name: String,
			age: Number,
			sus: String,
			entry: Date,
		},
		symptoms: {
			diabetes: Boolean,
			pressure: {
				type: String,
				enum: ['alta', 'baixa', 'normal'],
			},
			allergies: [String],
		},
		diagnosis: {
			dengue: Boolean,
			COVID: Boolean,
			lombriga: Boolean,
		},
		uti: Boolean,
	},

	{ collection: 'patient' }
);

const modelName: string = 'Patient';
export default connection && connection.models[modelName]
	? (connection.models[modelName] as Model<PatientType>)
	: model<PatientType>(modelName, schema);
