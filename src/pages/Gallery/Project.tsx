import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ImageWrapper from './ImageWrapper';
import { db } from '../../common/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import LoadingSpinner from './LoadingSpinner';

interface ProjectProps {
  state: string;
}

export interface ProjectStateProps extends ProjectProps {
  projectId: any;
  imageUrl: any;
}

const Project = ({ state }: ProjectProps) => {
  const [projectData, setProjectData] = useState<Array<ProjectStateProps>>();
  const [isLoading, setIsLoading] = useState(true);
  const fetchProjectData = async () => {
    try {
      const filterStateQuery = query(collection(db, 'projectData'), where('state', '==', state));
      const querySnapshot = await getDocs(filterStateQuery);
      const filteredData: Array<ProjectStateProps> = [];

      querySnapshot.forEach((doc) => {
        const projectId = doc.id;
        const data = doc.data();
        filteredData.push({ ...data, projectId } as ProjectStateProps);
      });
      setProjectData(filteredData);
    } catch (error) {
      console.error('프로젝트 Data Fetch 에러 :', error);
    }
  };

  useEffect(() => {
    fetchProjectData().then(() => setIsLoading(false));
  }, [state]);

  let projectState: string =
    state === 'ongoing'
      ? '진행중인'
      : state === 'scheduled'
      ? '예정된'
      : state === 'completed'
      ? '종료된'
      : '';

  return (
    <GalleryMainContainer>
      <CategoryTitleSection>
        <h1>{projectState} 프로젝트</h1>
        <BreadCrumb>갤러리 &gt; 프로젝트 &gt; {projectState} 프로젝트</BreadCrumb>
      </CategoryTitleSection>
      <ImageSection>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          projectData?.map((item, index) => {
            return (
              <ImageWrapper
                key={index}
                imageUrl={item.imageUrl}
                projectId={item.projectId}
                state={item.state}
              />
            );
          })
        )}
        {projectData?.length === 0 && <div>{projectState} 프로젝트가 없습니다.</div>}
      </ImageSection>
    </GalleryMainContainer>
  );
};

export default Project;

export const GalleryMainContainer = styled.div`
  width: 100%;
  padding: 10px 30px 30px;
`;

export const CategoryTitleSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BreadCrumb = styled.span`
  font-size: 12px;
  text-align: right;
  color: gray;
`;
export const ImageSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 0 5%;
  margin-top: 30px;
`;
