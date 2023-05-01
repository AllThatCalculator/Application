import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  PageScreenBox,
  PageWhiteScreenBox,
} from "../components/global-components/PageScreenBox";
import Title from "../components/global-components/Title";
import ProfileHeader from "../components/profile/ProfileHeader";
import UserCalculetList from "../components/profile/UserCalculetList";
import {
  handleGetUserIdCalculetList,
  handleGetUserIdProfile,
} from "../utils/handleUserActions";
import useGetUrlParam from "../hooks/useGetUrlParam";
import firebaseAuth from "../firebaseAuth";
import getSearchRequestBody from "../utils/getSearchRequestBody";
import usePage from "../hooks/usePage";
import {
  changeCategoryMain,
  changeCategorySub,
} from "../utils/changeCategorySelect";

async function getUserCalculetList(
  idToken,
  uuid,
  setIsLoading,
  categoryMainId,
  categorySubId,
  resultLimit,
  pageNum
) {
  let result;
  await setIsLoading(true);

  // get result
  await handleGetUserIdCalculetList(
    idToken,
    uuid,
    getSearchRequestBody(
      categoryMainId,
      categorySubId,
      "",
      resultLimit,
      pageNum,
      ""
    )
  ).then((res) => {
    result = res;
  });

  await setIsLoading(false);
  return result;
}

function Profile() {
  const { idToken } = useSelector((state) => ({
    idToken: state.userInfo.idToken,
  }));

  /**
   * 현재 url에서 uuid 뽑아 내기
   */
  let { uuidUrlId, categoryMainUrlId, categorySubUrlId, lenUrlId } =
    useGetUrlParam();

  const { profileCalculetSearchOptionPage } = usePage();

  const [uuid, setUuid] = useState(uuidUrlId);

  // input 컴포넌트에 맞는 id변수 들
  const [userInfo, setUserInfo] = useState({
    userName: "",
    profileImgSrc: "",
    job: "",
    bio: "",
    isMe: false,
  });

  const [userCalculetList, setUserCalculetList] = useState({
    calculetList: [
      {
        id: "",
        title: "",
        description: "",
        categoryMainId: "",
        categorySubId: "",
        viewCnt: 0,
        contributor: {
          id: "",
          userName: "",
          profileImgSrc: "",
        },
      },
    ],
    count: 0,
  });
  // 선택된 대분류, 소분류 id
  const [categoryMainId, setCategoryMainId] = useState(
    categoryMainUrlId !== null ? categoryMainUrlId : ""
  );
  const [categorySubId, setCategorySubId] = useState(
    categorySubUrlId !== null ? categorySubUrlId : ""
  );
  // result limit (default : 20)
  const KEY_DEFAULT_LEN = 20;
  const [resultLimit, setResultLimit] = useState(
    lenUrlId !== null ? lenUrlId : KEY_DEFAULT_LEN
  );

  // limit control
  function handleResultLimitChange(event) {
    let value = event.target.value;
    setResultLimit(value);
    // update
    profileCalculetSearchOptionPage(uuid, categoryMainId, categorySubId, value);
  }

  // main control
  function handleChangeCategoryMain(event) {
    // 대분류 타겟 value 값
    let value = event.target.value;
    changeCategoryMain(value, setCategoryMainId, setCategorySubId);
    // update
    profileCalculetSearchOptionPage(uuid, value, categorySubId, resultLimit);
  }

  // sub control
  function handleChangeCategorySub(event) {
    // 소분류 타겟 value 값
    let value = event.target.value;
    changeCategorySub(value, setCategorySubId);
    // update
    profileCalculetSearchOptionPage(uuid, categoryMainId, value, resultLimit);
  }

  // 현재 페이지 네비
  const [currentPage, setCurrentPage] = useState(1);
  const handleCurrentPageChange = (event, value) => {
    setCurrentPage(value);
  };

  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isCalculetListLoading, setIsCalculetListLoading] = useState(true);

  // get user info
  useEffect(() => {
    // uuid id is null => me
    if (uuidUrlId === null) {
      firebaseAuth.getAuthUuid().then((result) => {
        setUuid(result);
      });
    }
  }, []);

  // get user info
  useEffect(() => {
    setIsProfileLoading(true);

    if (!!uuid) {
      handleGetUserIdProfile(idToken, uuid).then((data) => {
        setUserInfo(data);
        setIsProfileLoading(false);
      });
    }
  }, [uuid]);

  // get calculet list
  useEffect(() => {
    // get result
    if (!!uuid) {
      getUserCalculetList(
        idToken,
        uuid,
        setIsCalculetListLoading,
        categoryMainId,
        categorySubId,
        resultLimit,
        currentPage
      ).then((res) => {
        setUserCalculetList(res);
        console.log(res);
      });
    }
  }, [uuid, categoryMainId, categorySubId, resultLimit, currentPage]);

  return (
    <PageWhiteScreenBox>
      <PageScreenBox gap="1.6rem">
        <Title content="프로필" />
        <ProfileHeader
          userInfo={userInfo}
          isProfileLoading={isProfileLoading}
        />
        <Divider />
        <UserCalculetList
          userInfo={userInfo}
          userCalculetList={userCalculetList}
          categoryMainId={categoryMainId}
          handleChangeCategoryMain={handleChangeCategoryMain}
          categorySubId={categorySubId}
          handleChangeCategorySub={handleChangeCategorySub}
          resultLimit={resultLimit}
          handleResultLimitChange={handleResultLimitChange}
          currentPage={currentPage}
          handleCurrentPageChange={handleCurrentPageChange}
          isCalculetListLoading={isCalculetListLoading}
        />
      </PageScreenBox>
    </PageWhiteScreenBox>
  );
}
export default Profile;
