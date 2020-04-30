import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Image } from '~/assets/image';
import OpenModal from '../modal/OpenModal';
import Media from '~/components/media/Media';
import Button from '~/components/button/Button';
import { FAVORITE_ICON } from '~/components/icons/icon';
import AddExperience from '../form/experience/AddExperience';

const UserDetail = ({ name, experience, preview, onPreviewBtnClicked }) => {
  const [showModal, setModal] = useState(false);

  const editBtnHandler = e => {
    e.preventDefault();
    setModal(!showModal);
  };

  const closeBtnHandler = e => {
    e.preventDefault();
    setModal(!showModal);
  };

  return (
    <section className="user-detail">
      <div className="user-detail-container">
        <div className="user-detail__left-content">
          <div className="user-detail__image-wrapper">
            <img src={Image} alt="Profile Picture" />
          </div>
          <div className="user-detail__emp-attribute">
            <div className="user-detail__username">{name}</div>
            <div className="user-detail__activity">
              <Media icon={FAVORITE_ICON} label={experience} onclick={editBtnHandler} />
              {showModal && (
                <OpenModal component={AddExperience} onClose={closeBtnHandler} showModal={showModal}></OpenModal>
              )}
            </div>
          </div>
        </div>
        <div className="user-detail__right-content">
          <Button content={!preview ? 'Preview' : 'Back To Edit'} onclick={onPreviewBtnClicked} />
        </div>
      </div>
    </section>
  );
};

UserDetail.propTypes = {
  name: PropTypes.string,
  experience: PropTypes.string,
  preview: PropTypes.bool,
  onPreviewBtnClicked: PropTypes.func,
};

export default UserDetail;
