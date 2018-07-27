import React from 'react';
import { storiesOf } from '@storybook/react';

import styles from "./Bgrs.scss";

storiesOf('Backgrounds', module)
  .add('V.1', () => (
    <div class="bgrs">
      <nav class="nav-bar"></nav>
      <div class="content-wrapper">
        <aside class="sidebar"></aside>
        <main class="content">
            <ol class="drop-down drop-down--dark">
              <li class="drop-down__item"><a class="drop-down__link" href="">Item 1</a></li>
              <li class="drop-down__item"><a class="drop-down__link" href="">Item 1</a></li>
            </ol>
            <ol class="drop-down drop-down--light">
              <li class="drop-down__item"><a class="drop-down__link" href="">Item 1</a></li>
              <li class="drop-down__item"><a class="drop-down__link" href="">Item 1</a></li>
            </ol>
            <ol class="drop-down drop-down--blue">
              <li class="drop-down__item"><a class="drop-down__link" href="">Item 1</a></li>
              <li class="drop-down__item"><a class="drop-down__link" href="">Item 1</a></li>
            </ol>
        </main>
      </div>
      <button class="button button--float"><i class="fas fa-plus"></i></button>
      <section class="modal">
        <div class="modal__box">
          <h1 class="modal__title"></h1>
          <div class="modal__content"></div>
          <nav class="action-set">
            <button class="action-set__button action-set__button--destructive"></button>
            <button class="action-set__button action-set__button--positive"></button>
          </nav>
        </div>
      </section>
      <section class="fly-in">
        <div class="fly-in__type"></div>
        <div class="fly-in__content"></div>
        <nav class="action-set">
          <button class="action-set__button action-set__button--destructive"></button>
          <button class="action-set__button action-set__button--positive"></button>
        </nav>
      </section>
    </div>

  ))
  .add('Another fun time', () => (
    <p>Another fun time</p>
  ));
