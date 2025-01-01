import React, { useEffect, useState } from 'react';
import Header from "../../common/Header.jsx";
import TimePickerComponent from "./Picker/TimePickerComponent";
import axios from "axios";

function Reservation({ isLogin, logout }) {
    const [state, setState] = useState({});
    const [services, setServices] = useState([]); // 서비스 목록을 상태로 관리
    const [members, setMembers] = useState([]); // 담당 직원 목록을 상태로 관리

    const [selectedReservation, setSelectedReservation] = useState({
        serviceName: '',
        customerName: '',
        memberName: '',
        reservationDate: '',
        reservationTime: '',
        reservationComm: '',
    });

    // 서비스, 담당 직원 목록을 DB에서 가져오는 useEffect
    useEffect(() => {
        fetch('http://localhost:8080/reservation/service/user')
            .then(response => response.json())
            .then(data => setServices(data))
            .catch(err => console.error('Error fetching services:', err));

        fetch('http://localhost:8080/reservation/member/user')
            .then(response => response.json())
            .then(data => setMembers(data))
            .catch(err => console.error('Error fetching members:', err));
    }, []);

    const handleFieldChange = (name, value) => {
        // 필드 변경 시 상태를 업데이트하는 함수
        setSelectedReservation(prev => ({
            ...prev, // 이전 상태를 유지
            [name]: value, // 변경된 필드 업데이트
        }));
        handleChange({ target: { name, value } }); // 부모로 값 전달
    };

    //입력 폼에서 값 변경 시 상태 업데이트
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value, // 변경된 입력값 상태 반영
        });
    };

    //예약 등록 process
    const handleInsert = () => {
        if (!state.serviceName || !state.customerName || !state.memberName) {
            //toast.error("서비스, 예약자, 직원을 선택해야 합니다.");
            return;
        }

        const dataToInsert = {
            serviceName: state.serviceName,
            customerName: state.customerName,
            memberName: state.memberName,
            reservationDate: state.reservationDate,
            reservationTime: state.reservationTime,
            reservationComm: state.reservationComm,
        };

        axios.post("http://localhost:8080/reservation/user", dataToInsert)
            .then((res) => {
                if (res.data.isSuccess) {
                    alert("예약이 성공적으로 완료 되었습니다!")
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div>
            <Header isLogin={isLogin} logout={logout} />
            <h1>예약하기</h1>

            <div>
                <form>
                    {/* 서비스명 Select */}
                    <div className="mb-3">
                        <label>서비스 명</label>
                        <select
                            name="serviceName"
                            value={selectedReservation.serviceName}
                            onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
                            className="form-control"
                        >
                            <option value="">서비스를 선택하세요</option>
                            {Array.isArray(services) && services.map((service) => (
                                <option key={service.serviceCode} value={service.serviceName}>
                                    {service.serviceName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 예약자 Input */}
                    <div className="mb-3">
                        <label>예약자</label>
                        <input
                            type="text"
                            name="customerName"
                            value={selectedReservation.customerName}
                            onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
                            className="form-control"
                            placeholder="예약자 이름을 입력하세요"
                        />
                    </div>

                    {/* 담당 직원 Select */}
                    <div className="mb-3">
                        <label>담당 직원</label>
                        <select
                            name="memberName"
                            value={selectedReservation.memberName}
                            onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
                            className="form-control"
                        >
                            <option value="">직원을 선택하세요</option>
                            {Array.isArray(members) && members.map((member) => (
                                <option key={member.memberId} value={member.memberName}>
                                    {member.memberName} / {member.memberJob}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 예약 날짜 */}
                    <div className="mb-3">
                        <label>예약 날짜</label>
                        <input
                            type="date"
                            name="reservationDate"
                            value={selectedReservation.reservationDate}
                            onFocus={(e) => e.target.showPicker()} // 클릭 시 달력 표시
                            onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
                            className="form-control"
                            min={new Date().toLocaleDateString('en-CA')} // 최소값: 오늘 날짜
                        />
                    </div>

                    {/* 예약 시간 */}
                    <div className="mb-3">
                        <label>예약 시간</label>
                        <TimePickerComponent
                            value={selectedReservation.reservationTime} // 선택된 예약 시간 전달
                            onChange={(value) => handleFieldChange('reservationTime', value)}
                            isEditing={true} // 항상 편집 가능
                        />
                    </div>

                    {/* 특이사항 */}
                    <div className="mb-3">
                        <label>특이사항</label>
                        <input
                            type="text"
                            name="reservationComm"
                            value={selectedReservation.reservationComm}
                            onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className="mt-3">
                        <button type="button" className="btn btn-primary" onClick={handleInsert}>
                            등록
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default Reservation;
