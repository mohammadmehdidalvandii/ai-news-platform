import {Sequelize} from 'sequelize';
import {config} from '../config/index';

const sequelize = new Sequelize(config.database.url ,{
    dialect:'postgres',
    logging:config.app.env === 'development' ? console.log : false,
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000,
    },
    timezone: '+00:00',
    define:{
        underscored:true,
        timestamps:true,
    },
});

export const connectDatabase = async ():Promise<void> =>{
    try{
        await sequelize.authenticate();
        console.log('✅ Database connected successfully');
        await sequelize.sync({alter:true});
        console.log('✅ Database synced successfully')
    } catch(error){
        console.error("❌ Database connection failed:" , error);
        process.exit(1)
    }
}

export default sequelize