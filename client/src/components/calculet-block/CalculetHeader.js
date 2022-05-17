import { useState } from "react";
import styled from "styled-components";
import { BoxIcon } from "../atom-components/BoxIcon";
import { BtnSmallIcon, BtnStatisticsIcon } from "../atom-components/ButtonIcon";
import styles from "../styles";

const CalculetName = styled.div`
  padding: 0;
  color: ${styles.styleColor.blue900};
  ${styles.sytleText.text300};
`;

const WrapperBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  ${styles.sytleText.text50}
`;

const WrapperLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const WrapperGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: flex-end;
`;

const StyledHr = styled.div`
  width: 897px;
  height: 1px;
  background-color: ${styles.styleColor.blue200};
`;

function CalculetHeader({ name, contributor, statistics }) {
  const [stats, setStats] = useState(statistics);
  return (
    <>
      <WrapperBox>
        <WrapperLine>
          <WrapperGroup>
            <CalculetName>{name}</CalculetName>
            <BtnSmallIcon
              text="info"
              icon="InfoCircle"
              color="blue"
              onClick={() => {
                console.log("information");
              }}
            />
          </WrapperGroup>
        </WrapperLine>
        <WrapperLine>
          <WrapperGroup>
            <BoxIcon
              text={contributor}
              icon="PeopleCircle"
              profile="/img/ori.png"
            />
            <BoxIcon text="view" icon="EyeFill" number={stats.viewCnt} />
          </WrapperGroup>

          <WrapperGroup>
            <BtnStatisticsIcon
              text="좋아요"
              icon="Heart"
              number={stats.likeCnt}
              isClicked={false}
              onClick={() => console.log("clicked")}
            />
            <BtnStatisticsIcon
              text="북마크"
              icon="BookmarkStar"
              number={stats.bookmarkCnt}
              isClicked={false}
              onClick={() => console.log("clicked")}
            />
            <BtnStatisticsIcon
              text="신고"
              icon="Flag"
              number={stats.reportCnt}
              isClicked={false}
              onClick={() => console.log("clicked")}
            />
          </WrapperGroup>
        </WrapperLine>
      </WrapperBox>
      <StyledHr />
    </>
  );
}

export default CalculetHeader;
