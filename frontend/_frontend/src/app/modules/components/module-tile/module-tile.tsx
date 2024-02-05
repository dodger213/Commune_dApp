"use client"

import React from "react";
import classNames from "classnames";
import Modal from 'antd/es/modal/Modal';

import classes from "./module-tile.module.css";
import ModuleDetailsModal from "./modal";
import { DislikeFilled, DislikeOutlined, DislikeTwoTone, HeartFilled, HeartOutlined, HeartTwoTone, LikeFilled, LikeOutlined, LikeTwoTone } from "@ant-design/icons";
import Image from "next/image";
import BasicImage from '../../../../../public/img/frontpage/blockchain-1.png'

type ModuleTileProps = {
  image_url?: string;
  name: string;
  address: string;
  description?: string;
  attributes?: string[];
};

export default function ModuleTile({
  image_url,
  name,
  address,
  description,
  attributes,
}: ModuleTileProps) {

  const [isShowDetailedModalOpen, setIsShowDetailedModalOpen] = React.useState(false)
  const [selectedModuleName, setSelectedModuleName] = React.useState('')
  const [isLikeIconClicked, setIsLikeIconClicked] = React.useState(false);
  const [isDisLikeIconClicked, setIsDisLikeIconClicked] = React.useState(false);
  const [isHeartIconClicked, setIsHeartIconClicked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(21)
  const [dislikeCount, setDislikeCount] = React.useState(2)
  const [heartCount, setHeartCount] = React.useState(23)

  const handleClickItem = (name: string) => {
    setIsShowDetailedModalOpen(true)
    setSelectedModuleName(name)
  }

  const handleCancelModal = () => {
    setIsShowDetailedModalOpen(false)
  }

  const handleClickLikeIcon = () => {
    if (isLikeIconClicked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);

    }
    setIsLikeIconClicked(!isLikeIconClicked);
  }

  const handleDisLikeIcon = () => {
    if (isDisLikeIconClicked) {
      setDislikeCount(dislikeCount - 1);
    } else {
      setDislikeCount(dislikeCount + 1);

    }
    setIsDisLikeIconClicked(!isDisLikeIconClicked)
  }

  const handleHeartIcon = () => {
    if (isHeartIconClicked) {
      setHeartCount(heartCount - 1);
    } else {
      setHeartCount(heartCount + 1);

    }
    setIsHeartIconClicked(!isHeartIconClicked)
  }

  return (
    <div className={classNames(classes.tileWrapper, ' rounded-lg z-40  border-solid')} style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 8px 11px 3px' }}>
      <li
        className={classNames(classes.moduleTile)}
        onClick={() => handleClickItem(name)}
      >
        <div className={classNames(classes.name, "bg-blue-100 rounded-lg")} style={{ fontSize: '1.1rem' }}>
          name: {name}
        </div>
        <div className={classNames(classes.address, "bg-orange-200 rounded-lg border-solid flex")} style={{ fontSize: '1.1rem' }}>
          address: {address}
        </div>
        <div className={classNames(classes.imageWrapper, "bg-green-100 rounded-lg border-solid")}>
          {
            image_url
              ? <Image src={image_url} className={classNames(classes.image, "rounded-lg")} alt="image" width={100} height={100} />
              : <span style={{ fontSize: '1.1rem' }}>No image</span>
          }
        </div>
        {
          description && <div className={classNames(classes.description, "bg-pink-100 rounded-lg border-solid h-[130px]")} style={{ fontSize: '1.1rem', padding: '.5rem' }}>
            description: {description}
          </div>
        }
        {
          attributes && (
            <div className={classes.attributes}>
              {attributes.map((attribute) => (
                <div key={attribute} className={classNames(classes.attribute, "bg-yellow-300 rounded-lg border-solid")}>
                  {attribute}
                </div>
              ))}
            </div>
          )
        }

      </li>
      {/* emotions */}
      <div className="flex items-center" style={{ position: 'relative', marginBottom: '1rem' }}>

        <div className="flex items-center">

          {
            isLikeIconClicked ?
              <LikeFilled className="hover:scale-150 mr-2" onClick={handleClickLikeIcon} style={{ fontSize: '1.2rem', color: 'blue', marginLeft: '1rem' }} />
              :
              <LikeOutlined className="hover:scale-150 mr-2" onClick={handleClickLikeIcon} style={{ fontSize: '1.2rem', color: 'rgba(184, 192, 209, 1)', marginLeft: '1rem' }} />
          }
          <span style={{ marginRight: '0.5rem', color: 'rgba(184, 192, 209, 1)' }}>{likeCount}</span>

        </div>

        <div className="flex items-center">

          {
            isDisLikeIconClicked ?
              <DislikeTwoTone className="hover:scale-150 mr-2" onClick={handleDisLikeIcon} style={{ fontSize: '1.2rem' }} />
              :
              <DislikeOutlined className="hover:scale-150 mr-2" onClick={handleDisLikeIcon} style={{ fontSize: '1.2rem', color: 'rgba(184, 192, 209, 1)' }} />
          }

          <span style={{ marginRight: '0.5rem', color: 'rgba(184, 192, 209, 1)' }}>{dislikeCount}</span>
        </div>

        <div className="flex items-center">
          {
            isHeartIconClicked ?
              <HeartFilled className="hover:scale-150 mr-2" onClick={handleHeartIcon} style={{ color: 'red', fontSize: '1.2rem' }} />
              :
              <HeartOutlined className="hover:scale-150 mr-2" onClick={handleHeartIcon} style={{ fontSize: '1.2rem', color: 'rgba(184, 192, 209, 1)' }} />
          }
          <span style={{ color: 'rgba(184, 192, 209, 1)' }}>{heartCount}</span>
        </div>
      </div>
      {
        isShowDetailedModalOpen &&
        (<Modal
          title={'Module Details'}
          open={isShowDetailedModalOpen}
          footer={null}
          onCancel={handleCancelModal} >
          <ModuleDetailsModal name={selectedModuleName} />
        </Modal>)
      }
    </div>
  );
}
