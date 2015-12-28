module.exports = function(deployTarget) {  
  return {
    pagefront: {
      app: 'caloriculator',
      key: process.env.PAGEFRONT_KEY
    }
  };
};
