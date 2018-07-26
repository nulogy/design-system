import React from 'react';
import { storiesOf } from '@storybook/react';

import styles from "./Bgrs.scss";

storiesOf('Backgrounds', module)
  .add('Type fun times', () => (
    <div class="bgrs">

      <nav class="nav-bar"></nav>
      <div class="content-wrapper">
        <aside class="sidebar"></aside>
        <main class="content">
            <ol class="drop-down drop-down__dark">
              <li class="drop-down--item"><a class="drop-down--link" href="">Item 1</a></li>
              <li class="drop-down--item"><a class="drop-down--link" href="">Item 1</a></li>
            </ol>
            <ol class="drop-down drop-down__light">
              <li class="drop-down--item"><a class="drop-down--link" href="">Item 1</a></li>
              <li class="drop-down--item"><a class="drop-down--link" href="">Item 1</a></li>
            </ol>
            <ol class="drop-down drop-down__blue">
              <li class="drop-down--item"><a class="drop-down--link" href="">Item 1</a></li>
              <li class="drop-down--item"><a class="drop-down--link" href="">Item 1</a></li>
            </ol>
        </main>
      </div>
      <button class="button button__float"><i class="fas fa-plus"></i></button>
      <section class="modal">
        <div class="modal--box">
          <h1 class="modal--title"></h1>
          <div class="modal--content"></div>
          <nav class="action-set">
            <button class="action-set--button action-set--button__destructive"></button>
            <button class="action-set--button action-set--button__positive"></button>
          </nav>
        </div>
      </section>
      <section class="fly-in">
        <div class="fly-in--type"></div>
        <div class="fly-in--content"></div>
        <nav class="action-set">
          <button class="action-set--button action-set--button__destructive"></button>
          <button class="action-set--button action-set--button__positive"></button>
        </nav>
      </section>
    </div>

  ))
  .add('Another fun time', () => (
    <p>Another fun time</p>
  ));
