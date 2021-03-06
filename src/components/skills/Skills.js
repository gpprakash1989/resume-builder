import React, { useContext, useState } from 'react';

import { Add } from '~/assets/image';
import * as storage from '~/storage/LocalStorage';
import SkillItem from '~/components/skills/SkillItem';
import { FormContext } from '~/components/FormContext';
import AddSkill from '~/components/form/skill/AddSkill';
import EmptyCard from '~/components/emptycard/EmptyCard';
import CardHeader from '~/components/cardheader/CardHeader';
import CardFooter from '~/components/cardfooter/CardFooter';

const Skills = () => {
  const context = useContext(FormContext);

  const [addSkill, setAdd] = useState(false);

  const preview = context.preview.get;
  const skills = context.data.get.skills;

  const toggleAddSkil = () => setAdd(!addSkill);

  /**
   * Update the hidden state of skill.
   *
   * @param {string} key [ label of a particular skill].
   */
  const updateHiddenStateSkill = key => {
    const data = context.data.get;

    data['skills'].find(({ label, hidden }, index) => {
      if (label === key) {
        const newState = !hidden;

        data['skills'][index].hidden = newState;

        context.data.set(data); // new state of data
      }
    });
  };

  const deleteSkill = name => {
    const data = context.data.get;

    const filteredSkills = data['skills'].filter(skill => {
      return skill.label !== name;
    });

    data['skills'] = filteredSkills;

    storage.saveResume(data);
    context.data.set(prevState => ({ ...prevState, ...data }));
  };

  if ((!skills || skills.length < 1) && preview) {
    return <></>;
  }

  if (!skills || skills.length < 1) {
    return (
      <div className="content-block">
        <div className="card">
          <EmptyCard emptyMessage="You do not have any skills yet."></EmptyCard>
          <CardFooter
            icon={Add}
            hide={preview}
            label="Add another skill"
            showModal={addSkill}
            onAdd={toggleAddSkil}
            component={AddSkill}
            onClose={toggleAddSkil}
            modifier="empty"
          />
        </div>
      </div>
    );
  }

  const skillsList = skills.map(({ name, subSkills }, index) => (
    <SkillItem
      key={index}
      title={name}
      values={subSkills}
      preview={preview}
      onHiddenIconClicked={updateHiddenStateSkill}
      onDelete={deleteSkill}
    />
  ));

  return (
    <div className="content-block">
      <div className="card">
        <CardHeader title="Skills" />
        <div className="skills">{skillsList}</div>
        <CardFooter
          icon={Add}
          hide={preview}
          label="Add another skill"
          showModal={addSkill}
          onAdd={toggleAddSkil}
          component={AddSkill}
          onClose={toggleAddSkil}
        />
      </div>
    </div>
  );
};

export default Skills;
