import { useState } from "react";
import styled from "styled-components";
import styles from "../styles";

const StyledItem = styled.button`
  display: flex;
  flex-direction: row;
  gap: 3px;
  border: 0;
  padding: 0;
  margin: 0;
  background: none;
`;

const CalculetName = styled.div`
  padding: 0;
  color: ${styles.styleColor.blue900};
  ${styles.sytleText.text300};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;

  ${styles.sytleText.text50}
`;

const StatisticsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const FrontWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 9px;
  align-items: flex-end;
`;

function Item({ text, number }) {
  return (
    <StyledItem>
      <div style={{ color: styles.styleColor.blue900 }}>{text}</div>
      {number !== null && (
        <div style={{ color: styles.styleColor.gray100 }}>{number}</div>
      )}
    </StyledItem>
  );
}

function CalculetHeader({ name, contributor, statistics }) {
  const [stats, setStats] = useState(statistics);
  return (
    <Wrapper>
      <FrontWrapper>
        <CalculetName>{name}</CalculetName>
        <Item text={contributor} number={null} />
      </FrontWrapper>

      <StatisticsWrapper>
        <Item text="View" number={stats.viewCnt} />
        <Item text="Like" number={stats.likeCnt} />
        <Item text="Mark" number={stats.bookmarkCnt} />
        <Item text="Report" number={stats.reportCnt} />
      </StatisticsWrapper>
    </Wrapper>
  );
}

export default CalculetHeader;
