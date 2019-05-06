import React from 'react'

import { AddStepButton, SubmitButton } from './buttons'
import {
  DescInput,
  DifficultyInputGroup,
  ImageInput,
  IngredientsInput,
  ServingsInput,
  StepsInput,
  TimeInput,
  TitleInput
} from './inputs'

const CreateForm = ({
  title,
  isInvalid,
  imageUrl,
  ingredients,
  description,
  servings,
  steps,
  time,
  loading,
  onAddStep,
  onChange,
  onSubmit,
  onChangeRadioButton,
  onChangeStep
}) => (
  <div className="create-recipe">
    <h1 className="create-recipe__header">Let's create a new awesome recipe</h1>
    <form onSubmit={onSubmit} className="create-recipe__form">
      <TitleInput title={title} onChange={onChange} />
      <ImageInput imageUrl={imageUrl} onChange={onChange} />
      <DescInput description={description} onChange={onChange} />
      <div className="create-recipe__details">
        <ServingsInput servings={servings} onChange={onChange} />
        <TimeInput time={time} onChange={onChange} />
        <DifficultyInputGroup onChangeRadioButton={onChangeRadioButton} />
      </div>
      <IngredientsInput ingredients={ingredients} onChange={onChange} />
      <StepsInput steps={steps} onChangeStep={onChangeStep} />
      <AddStepButton onAddStep={onAddStep} />
      <SubmitButton isInvalid={isInvalid} loading={loading} />
    </form>
  </div>
)

export default CreateForm
