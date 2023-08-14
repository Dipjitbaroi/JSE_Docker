// const { DataTypes } = require('sequelize');
import DataTypes from 'sequelize';
// const sequelize = require('./database');
import db from '../config/database.js'; // Assuming you have configured Sequelize and established a database connection

export const home = db.define('home', {
  text_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  img: {
    type: DataTypes.BLOB,
    allowNull: true
  }
}, {
    freezeTableName: true,
    timestamps : false
});

export const about = db.define('about', {
    text_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    img: {
      type: DataTypes.BLOB,
      allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps : false
});

export const about_container = db.define('about_container', {
    text_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    img: {
      type: DataTypes.BLOB,
      allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps : false
});

export const services = db.define('services', {
  text_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  img: {
    type: DataTypes.BLOB,
    allowNull: true
  }
}, {
  freezeTableName: true,
  timestamps : false
});

export const services_container = db.define('services_container', {
  text_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  img: {
    type: DataTypes.BLOB,
    allowNull: true
  }
}, {
  freezeTableName: true,
  timestamps : false
});

export const team = db.define('team', {
  text_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  img: {
    type: DataTypes.BLOB,
    allowNull: true
  }
}, {
  freezeTableName: true,
  timestamps : false
});



export const portfolio = db.define('portfolio', {
  text_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  img: {
    type: DataTypes.BLOB,
    allowNull: true
  }
}, {
  freezeTableName: true,
  timestamps : false
});



// export (home);

// export default home_container;
db.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized successfully with model definitions.');
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  });
