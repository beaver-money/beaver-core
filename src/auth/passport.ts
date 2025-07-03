import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcryptjs";
import userService from "@src/resources/users/service";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Local strategy for login
passport.use(new LocalStrategy(
  { usernameField: "email" },
  async (email, password, done) => {
    const user = await userService.findByEmail(email);
    if (!user) return done(null, false, { message: "Incorrect email." });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return done(null, false, { message: "Incorrect password." });
    return done(null, user);
  }
));

// JWT strategy for protected routes
passport.use(new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    const user = await userService.findById(jwtPayload.id);
    if (!user) return done(null, false);
    return done(null, user);
  }
));

export default passport;