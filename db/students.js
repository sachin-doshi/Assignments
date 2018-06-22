
export default(sequelize,Datatypes)=>{
    const Student = sequelize.define('student',{
        quizScore1: Datatypes.INTEGER,
        quizScore2: DataTypes.INTEGER,
        quizScore3: DataTypes.INTEGER
    });

    return Student;

}