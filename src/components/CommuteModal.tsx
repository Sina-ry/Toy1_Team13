import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { commuteState } from '../data/atoms';
import { RxDoubleArrowRight } from 'react-icons/rx';
import { timeToLocaleTimeString } from '../utils/formatTime';

interface Props {
  isModalOpen: boolean;
}

const CommuteModal = ({ isModalOpen }: Props) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [commuteInfo, setCommuteInfo] = useRecoilState(commuteState);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleCommuteToggle = () => {
    if (commuteInfo.commute) {
      setCommuteInfo({
        ...commuteInfo,
        commute: false,
        endTime: Date.now(),
        workingTime: Date.now() - commuteInfo.startTime,
      });
    } else {
      setCommuteInfo({
        ...commuteInfo,
        commute: true,
        startTime: Date.now(),
      });
    }
  };

  const [hour, minute, second] = currentTime.toLocaleTimeString('it-IT').split(':');

  return (
    <ModalContainer className={isModalOpen ? 'open' : ''}>
      <div className="wrapper">
        <h3>출퇴근 시간 입력</h3>
        <div className="content-wrapper">
          <div className="timer">
            <span>{hour}</span> : <span>{minute}</span> : <span>{second}</span>
          </div>
          <div className="commute-time">
            <span>
              {commuteInfo.startTime ? timeToLocaleTimeString(commuteInfo.startTime) : '출근 전'}
            </span>
            <RxDoubleArrowRight />
            <span>
              {commuteInfo.endTime ? timeToLocaleTimeString(commuteInfo.endTime) : '퇴근 전'}
            </span>
          </div>
          <div className="btn-wrapper">
            <button onClick={handleCommuteToggle} type="button">
              {commuteInfo.commute ? '퇴근' : '출근'}
            </button>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: absolute;
  top: 3rem;
  right: 0.6rem;
  z-index: 100;

  min-width: 300px;

  visibility: hidden;
  opacity: 0;
  transition:
    opacity 0.2s ease-in-out,
    visibility 0.2s ease-in-out;

  &.open {
    visibility: visible;
    opacity: 1;
  }

  .wrapper {
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding: 0.6rem 1rem;

    border-radius: 0.6rem;
    border: 1px solid #222222;
    background-color: #ffffff;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);

    h3 {
      margin-bottom: 1rem;
    }

    .content-wrapper {
      display: flex;
      align-items: center;
      flex-direction: column;

      width: 100%;

      .timer {
        display: flex;
        align-items: center;
        column-gap: 0.4rem;

        margin-bottom: 1rem;

        span {
          font-size: 1.5rem;
          font-weight: 600;
        }
      }

      .commute-time {
        display: flex;
        align-items: center;
        column-gap: 0.4rem;

        margin-bottom: 1rem;
      }

      .btn-wrapper {
        width: 100%;

        button {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 100%;

          padding: 0.6rem 1rem;

          border-radius: 2rem;
          border: 1px solid #222222;
          background-color: #ffffff;

          &:hover {
            background-color: #f2f2f2;
          }
        }
      }
    }
  }
`;

export default CommuteModal;
