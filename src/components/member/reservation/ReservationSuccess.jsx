import './modal.css';
import React from 'react';
import { useNavigate } from 'react-router-dom'; // React Router를 사용한 리다이렉트

function ReservationSuccess({ setShowSuccessModal }) {
	const navigate = useNavigate(); // React Router의 네비게이션 훅 사용

	const handleConfirm = () => {
		setShowSuccessModal(false); // 모달 닫기
		navigate('/'); // 메인 홈페이지로 리다이렉트
	};

	return (
		<div
			className="modal show"
			style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
			tabIndex="-1"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					{/*<div className="modal-header">*/}
					{/*	<h5 className="modal-title">예약 성공</h5>*/}
					{/*</div>*/}
					<div className="modal-body">
						<p>예약이 성공적으로 완료되었습니다!</p>
					{/*</div>*/}
					{/*<div className="modal-footer">*/}
						<button
							type="button"
							className="btn btn-primary"
							onClick={handleConfirm}
						>
							확인
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ReservationSuccess;
