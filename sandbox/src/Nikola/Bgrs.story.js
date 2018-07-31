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
    <section class="color-set color-set__nu6">
      <h1>Nu 7</h1>
      <p class="notification notification--fail"><span class="notification__title">You are offline</span><span class="notification__description">Do this to fix...</span></p>
      <div class="wrapper">
        <aside>
            <nav>
              <ol class="nav">
                <li><a class="nav--item" href="">Link</a></li>
                <li><a class="nav--item nav--item__active" href="">Active Link</a></li>
                <li><a class="nav--item" href="">Link</a></li>
                <li><a class="nav--item" href="">Link</a></li>
              </ol>
            </nav>
        </aside>
        <div class="main">
          <div class="block block--button-set">
            <button class="button button__primary">Primary Button</button>
            <button class="button button__secondary">Secondary</button>
            <button class="button button__secondary">Button</button>
            <button class="button button__secondary__outlined">Secondary Button</button>
            <button class="button button__disabled">Another Button</button>
            <button class="button button__tertiary">Tertiary</button>
          </div>
          <div class="block block--button-set block--button-set__alt">
            <button class="button button__primary">Primary Button</button>
            <button class="button button__secondary">Secondary</button>
            <button class="button button__secondary">Button</button>
            <button class="button button__secondary__outlined">Secondary Button</button>
            <button class="button button__disabled">Another Button</button>
            <button class="button button__tertiary">Tertiary</button>
          </div>
          <div class="block block--button-set block--button-set__pass">
            <button class="button button__primary">Primary Button</button>
            <button class="button button__secondary">Secondary</button>
            <button class="button button__secondary">Button</button>
            <button class="button button__secondary__outlined">Secondary Button</button>
            <button class="button button__disabled">Another Button</button>
            <button class="button button__tertiary">Tertiary</button>
          </div>
          <div class="block block--button-set block--button-set__fail">
            <button class="button button__primary">Primary Button</button>
            <button class="button button__secondary">Secondary</button>
            <button class="button button__secondary">Button</button>
            <button class="button button__secondary__outlined">Secondary Button</button>
            <button class="button button__disabled">Another Button</button>
            <button class="button button__tertiary">Tertiary</button>
          </div>
          <div class="block block--button-set block--button-set__warning">
            <button class="button button__primary">Primary Button</button>
            <button class="button button__secondary">Secondary</button>
            <button class="button button__secondary">Button</button>
            <button class="button button__secondary__outlined">Secondary Button</button>
            <button class="button button__disabled">Another Button</button>
            <button class="button button__tertiary">Tertiary</button>
          </div>

          <div class="block block--card">
            <div class="card-img">
              <i class="fas fa-grin"></i>
            </div>
            <div class="card--inset">
              <h2>Card Title</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ornare metus sapien, eu aliquet augue egestas eget. Ut nec nunc non risus semper auctor sed in tortor. Proin nec tellus erat. In hac habitasse platea dictumst. In semper magna eu viverra pulvinar. Aenean facilisis lorem consectetur nisl ultricies, quis pharetra ligula tincidunt.</p>
              <ol class="actions">
                <li><a class="action-item action-item__positive">Something</a></li>
                <li><a class="action-item action-item__destructive">Something else</a></li>
              </ol>
            </div>
          </div>

          <div class="block block--notification">
            <h2>NotificationTitle</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ornare metus sapien, eu aliquet augue egestas eget. Ut nec nunc non risus semper auctor sed in tortor. Proin nec tellus erat. In hac habitasse platea dictumst. In semper magna eu viverra pulvinar. Aenean facilisis lorem consectetur nisl ultricies, quis pharetra ligula tincidunt.</p>
          </div>

          <div class="block block--table">
            <table>
              <thead>
                <tr>
                  <th>khsdhs</th>
                  <th>khsdhs</th>
                  <th>khsdhs</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><button class="button button__primary">I am a button</button></td>
                  <td>khsdhs</td>
                  <td class="status status__pass"><span class="status--status-indicator"></span>Pass</td>
                </tr>
                <tr>
                  <td><button class="button button__primary">I am a button</button></td>
                  <td>khsdhs</td>
                  <td class="status status__fail"><span class="status--status-indicator"></span>Fail</td>
                </tr>
                <tr>
                  <td><button class="button button__primary">I am a button</button></td>
                  <td>khsdhs</td>
                  <td class="status status__pass"><span class="status--status-indicator"></span>Pass</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="block block--form">
            <ol>
              <li>
                <label>Label 1</label>
                <input type="text" />
              </li>
              <li>
                <label>Label 2</label>
                <input type="text" />
              </li>
              <li>
                <label>Label 3</label>
                <input type="text" />
              </li>
              <li class="val-status val-status__error">
                <label>Label 4</label>
                <input type="text" />
                <div class="val">You have entered wrong thing. Try this ...</div>
              </li>
            </ol>
          </div>
          <div class="block block--tinies">
            <span class="pill pill__solid__pass">Pass</span>
            <span class="pill pill__solid__fail">Fail</span>
            <span class="pill pill__inverted__pass">Open</span>
            <span class="pill pill__inverted__fail">Closed</span>
          </div>
        </div>
      </div>
      <section class="fly-in fly-in--warning">
        <div class="fly-in__type"></div>
        <div class="fly-in__content">Some text</div>
        <nav class="action-set">
          <button class="action-set__button action-set__button--destructive"></button>
          <button class="action-set__button action-set__button--positive"></button>
        </nav>
      </section>
    </section>
  ));
