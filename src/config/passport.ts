import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import Attendent from "../models/attendentModel";
import { Error, ObjectId } from "mongoose";

const notAuthorizedJson = { status: 401, message: "Não autorizado" };

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET as string,
};

const jwtStrategy = new JWTStrategy(options, async (payload, done) => {
	try {
		const attendent = await Attendent.findById(payload.id);
		if (attendent) {
			return done(null, attendent);
		} else {
			return done(null, false);
		}
	} catch (error) {
		return done(error, false);
	}
});

passport.use(jwtStrategy);

export const generateToken = (data: object) => {
	return jwt.sign(data, process.env.JWT_SECRET as string);
};

export const privateRoute = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	passport.authenticate(
		"jwt",
		{ session: false },
		(err: Error, attendent: ObjectId) => {
			if (err) {
				return next(err);
			}

			if (attendent) {
				req.body = attendent;
				return next();
			} else {
				return next(notAuthorizedJson);
			}
		}
	)(req, res, next);
};
export default jwtStrategy;
