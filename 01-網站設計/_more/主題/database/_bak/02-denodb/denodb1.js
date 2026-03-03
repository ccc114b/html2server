import { DataTypes, Database, Model, SQLite3Connector } from 'https://deno.land/x/denodb/mod.ts';

const connection = new SQLite3Connector({
  filepath: './database.sqlite',
})

const db = new Database(connection);

class Flight extends Model {
  static table = 'flights';
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    departure: DataTypes.STRING,
    destination: DataTypes.STRING,
    flightDuration: DataTypes.FLOAT,
  };

  static defaults = {
    flightDuration: 2.5,
  };
}

db.link([Flight]);

await db.sync({ drop: true });

await Flight.create({
  departure: 'Paris',
  destination: 'Tokyo',
});

// or

const flight = new Flight();
flight.departure = 'London';
flight.destination = 'San Francisco';
await flight.save();

console.log('await Flight.select(destination).all()=', await Flight.select('destination').all())
// [ { destination: "Tokyo" }, { destination: "San Francisco" } ]

await Flight.where('destination', 'Tokyo').delete();

const sfFlight = await Flight.select('destination').find(2);
console.log('await Flight.select(destination).find(2)=', await Flight.select('destination').find(2))
// { destination: "San Francisco" }

console.log('await Flight.count()=', await Flight.count())
// 1

console.log('await Flight.select(id, destination).orderBy(id).get()=', await Flight.select('id', 'destination').orderBy('id').get())
// [ { id: "2", destination: "San Francisco" } ]

// await sfFlight.delete();

await db.close();
