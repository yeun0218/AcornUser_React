import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); // .env 파일에서 환경 변수 로드

// 데이터베이스 연결 설정
const firebase = mysql.createPool({
    host: process.env.DB_HOST || "localhost", // 기본값 제공
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "test",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// 연결 확인 함수
const testConnection = async () => {
    try {
        const connection = await firebase.getConnection();
        console.log("✅ Database connection successful");
        connection.release(); // 연결 반환
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
        process.exit(1); // 심각한 오류 시 프로세스 종료
    }
};

// 프로세스 종료 시 연결 풀 해제
const handleExit = () => {
    firebase.end()
        .then(() => console.log("✅ Database pool closed"))
        .catch((err) => console.error("❌ Error closing database pool:", err.message))
        .finally(() => process.exit());
};

process.on("SIGINT", handleExit); // Ctrl+C 종료
process.on("SIGTERM", handleExit); // 시스템 종료 신호

// 서버 시작 시 연결 확인
testConnection();

export default firebase;
