import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

async function test() {
  console.log("bcrypt:", typeof bcrypt);
  if (bcrypt) {
    console.log("bcrypt.genSalt:", typeof bcrypt.genSalt);
    try {
      const salt = await bcrypt.genSalt(10);
      console.log("salt generated:", salt.substring(0, 10) + '...');
    } catch(e) {
      console.error("bcrypt error:", e);
    }
  }

  console.log("jwt:", typeof jwt);
  if (jwt) {
    console.log("jwt.sign:", typeof jwt.sign);
  }
}

test().catch(console.error);
