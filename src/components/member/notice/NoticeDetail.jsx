import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import defaultServiceImage from "../../../assets/images/logo_black.png"; // 기본 이미지

export default function NoticeDetail() {
  const navigate = useNavigate();
  const { no } = useParams(); // URL 파라미터에서 공지 ID 가져오기
  const [notice, setNotice] = useState({}); // 공지사항 데이터 상태
  const [comments, setComments] = useState([]); // 댓글 데이터 상태
  const [newComment, setNewComment] = useState(""); // 새로운 댓글 입력값 상태
  const [replyingTo, setReplyingTo] = useState(null); // 답글 작성 중인 댓글 ID
  const [replyContent, setReplyContent] = useState(""); // 답글 내용
  const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글 ID
  const [editingContent, setEditingContent] = useState(""); // 수정 중인 댓글 내용

  // 공지사항과 댓글 데이터 가져오기
  useEffect(() => {
    // 공지사항 데이터 가져오기
    axios.get(`http://localhost:8080/notice/${no}`).then((response) => {
      setNotice(response.data);
    });

    // 댓글 데이터 가져오기
    axios.get(`http://localhost:8080/comment/${no}`).then((response) => {
      setComments(response.data);
    });
  }, [no]);

  // 댓글 트리 구조로 변환 (부모-자식 관계 설정)
  const buildCommentTree = (comments) => {
    const map = {};
    const tree = [];
  
    // 모든 댓글을 map에 저장 (commentNo를 키로 사용)
    comments.forEach((comment) => {
      map[comment.commentNo] = { ...comment, children: [] };
    });
  
    // 트리 구조 생성
    comments.forEach((comment) => {
      if (comment.parentNo === null) {
        // 최상위 댓글
        tree.push(map[comment.commentNo]);
      } else {
        // 답글
        const parent = map[comment.parentNo];
        if (parent) {
          parent.children.push(map[comment.commentNo]);
        } else {
          console.error(
            `댓글 번호로 부모 댓글을 찾을 수 없음 : ${comment.commentNo}, 부모 번호 : ${comment.parentNo}`
          );
        }
      }
    });
    return tree;
  };

  // 댓글 추가
  const handleAddComment = () => {
    if (!newComment.trim()) return; // 입력값이 비어있으면 종료

    axios
      .post(`http://localhost:8080/comment`, {
        noticeNo: no,
        parentNo: null, // 최상위 댓글
        authorType: "CUSTOMER", // 작성자 타입
        content: newComment,
      })
      .then((response) => {
        // 댓글 리스트 갱신
        setComments((prev) => buildCommentTree([...prev, response.data]));
        setNewComment(""); // 입력값 초기화
      });
  };

  // 답글 추가
  const handleAddReply = (parentNo) => {
    if (!replyContent.trim()) return; // 입력값이 비어있으면 종료
  
    axios
      .post(`http://localhost:8080/comment`, {
        noticeNo: no,
        parentNo, // 부모 댓글 ID
        authorType: "CUSTOMER",
        content: replyContent,
      })
      .then((response) => {
        setComments((prev) => {
          // 부모 댓글의 children에 답글 추가
          const updateReplies = (comments) => {
            return comments.map((comment) => {
              if (comment.commentNo === parentNo) {
                return {
                  ...comment,
                  replies: [...comment.replies, response.data],
                };
              }
              if (comment.replies) {
                return {
                  ...comment,
                  replies: updateReplies(comment.replies),
                };
              }
              return comment;
            });
          };
          return updateReplies(prev);
        });
        setReplyingTo(null); // 답글 상태 초기화
        setReplyContent(""); // 입력값 초기화
      });
  };  

  //댓글 삭제
  const handleDeleteComment = (commentNo) => {
    axios
      .delete(`http://localhost:8080/comment/${commentNo}`)
      .then(() => {
        setComments((prev) => {
          const removeComment = (comments) => {
            return comments
              // 해당 댓글 제거
              .filter((comment) => comment.commentNo !== commentNo)
              .map((comment) => ({
                ...comment,
                // 답글도 재귀적으로 삭제
                replies: removeComment(comment.replies || []),
              }));
          };
          return removeComment(prev); // 상태 갱신
        });
      })
      .catch((error) => {
        console.error("댓글 삭제 중 오류 발생:", error);
      });
  };  

  // 댓글 수정 모드
  const handleEditComment = (commentNo, content) => {
    setEditingCommentId(commentNo); // 수정 중인 댓글 ID 설정
    setEditingContent(content); // 수정할 내용 설정
  };

  // 댓글 수정 취소
  const handleCancelEdit = () => {
    setEditingCommentId(null); // 수정 상태 초기화
    setEditingContent(""); // 입력값 초기화
  };

  // 댓글 저장 (수정 완료)
  const handleSaveEdit = (commentNo) => {
    if (!editingContent.trim()) return; // 입력값이 비어있으면 종료
  
    axios
      .put(`http://localhost:8080/comment/${commentNo}`, {
        content: editingContent,
      })
      .then((response) => {
        const { updatedAt } = response.data; // 수정된 시간 반환
        setComments((prev) => {
          const updateComment = (comments) => {
            return comments.map((comment) => {
              if (comment.commentNo === commentNo) {
                // 수정된 댓글 갱신
                return { ...comment, content: editingContent, updatedAt };
              }
              return {
                ...comment,
                // 답글도 재귀적으로 검사
                replies: updateComment(comment.replies || []),
              };
            });
          };
          return updateComment(prev); // 상태 갱신
        });
        setEditingCommentId(null); // 수정 상태 초기화
        setEditingContent(""); // 입력값 초기화
      });
  };  

  // 댓글 리스트 렌더링
  const renderComments = (comments, depth = 0) => {
    return comments.map((comment) => (
      <div
        key={comment.commentNo}
        style={{
          // 깊이에 따른 들여쓰기
          marginLeft: `20px`,
          marginBottom: "10px",
        }}
      >
        <div className="border rounded p-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              {editingCommentId === comment.commentNo ? (
                <Form.Control
                  type="text"
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  style={{ marginBottom: "10px", width: "160%" }}
                />
              ) : (
                <p style={{ marginBottom: "5px" }}>{comment.content}</p>
              )}
              <small className="text-muted">
                작성자: {comment.authorType === "ADMIN" ? "관리자" : "고객"} | 작성일:{" "}
                {new Date(
                  new Date(comment.updatedAt).getTime() > new Date(comment.createdAt).getTime()
                    ? comment.updatedAt // 수정된 시간 표시
                    : comment.createdAt // 작성된 시간 표시
                ).toLocaleString()}
                {new Date(comment.updatedAt).getTime() !==
                  new Date(comment.createdAt).getTime() && (
                  <span style={{ marginLeft: "5px", color: "gray" }}>(수정)</span>
                )}
              </small>
            </div>
            <div className="d-flex align-items-center">
              {comment.authorType === "ADMIN" ? (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    setReplyingTo(
                      replyingTo === comment.commentNo ? null : comment.commentNo
                    )
                  }
                  style={{
                    padding: "5px 10px",
                    fontSize: "14px",
                    textDecoration: "none",
                    boxShadow: "none",
                    marginRight: "5px",
                  }}
                >
                  답글
                </Button>
              ) : (
                <>
                  {editingCommentId === comment.commentNo ? (
                    <>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleSaveEdit(comment.commentNo)}
                        style={{
                          padding: "5px 10px",
                          fontSize: "14px",
                          textDecoration: "none",
                          boxShadow: "none",
                          marginRight: "5px",
                        }}
                      >
                        저장
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleCancelEdit}
                        style={{
                          padding: "5px 10px",
                          fontSize: "14px",
                          textDecoration: "none",
                          boxShadow: "none",
                        }}
                      >
                        취소
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() =>
                          handleEditComment(comment.commentNo, comment.content)
                        }
                        style={{
                          padding: "5px 10px",
                          fontSize: "14px",
                          textDecoration: "none",
                          boxShadow: "none",
                          marginRight: "5px",
                        }}
                      >
                        수정
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteComment(comment.commentNo)}
                        style={{
                          padding: "5px 10px",
                          fontSize: "14px",
                          textDecoration: "none",
                          boxShadow: "none",
                        }}
                      >
                        삭제
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          {replyingTo === comment.commentNo && (
            <div className="mt-3 d-flex">
              <Form.Control
                type="text"
                placeholder="답글을 입력하세요"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                style={{ flex: "1", marginRight: "10px" }}
              />
              <Button
                variant="primary"
                onClick={() => handleAddReply(comment.commentNo)}
              >
                작성
              </Button>
            </div>
          )}
        </div>

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-2">{renderComments(comment.replies, depth + 1)}</div>
        )}
      </div>
    ));
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <img
            src={notice.noticeImagePath || defaultServiceImage}
            alt="공지 이미지"
            style={{
              width: "100%",
              maxHeight: "400px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </Col>
        <Col md={7}>
          <h3>{notice.noticeTitle}</h3>
          <p>{notice.noticeContent}</p>
          <p className="text-muted">작성일: {new Date(notice.noticeReg).toLocaleDateString()}</p>

          <div className="border rounded p-3">
            <h5>댓글</h5>
            <div>{renderComments(comments)}</div>

            <Row className="mt-3">
              <Col className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="댓글을 입력하세요"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddComment();
                    }
                  }}
                  style={{
                    flex: "1 1 auto",
                    maxWidth: "80%",
                  }}
                  className="me-4"
                />
                <Button
                  variant="primary"
                  onClick={handleAddComment}
                  style={{
                    padding: "5px 10px",
                    fontSize: "14px",
                    textDecoration: "none",
                    boxShadow: "none",
                  }}
                >
                  댓글 추가
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col className="d-flex justify-content-center">
          <Button
            variant="secondary"
            onClick={() => navigate(`/notice/${notice.prevNo}`)}
            disabled={!notice.prevNo}
            className="mx-2"
          >
            이전
          </Button>
          <Button variant="primary" onClick={() => navigate("/notice")} className="mx-2">
            목록
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate(`/notice/${notice.nextNo}`)}
            disabled={!notice.nextNo}
            className="mx-2"
          >
            다음
          </Button>
        </Col>
      </Row>
    </Container>
  );
}