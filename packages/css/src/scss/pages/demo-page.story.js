/* global document */
import { storiesOf } from "@storybook/html";

storiesOf("Pages/Demo", module).add(
  "Demo",
  () => `

    <style>
      .NDSDemoPage {
        min-height: 1000px;
        width: 100%;
      }
    </style>

    <div class="NDSDemoPage nds-flex nds-flex--column nds-background--white-grey">
      <nav class="nds-background--black-blue nds-padding-top--x2 nds-padding-bottom--x2 nds-padding-right--x3 nds-padding-left--x3">
        <svg height="32px" width="133px" viewBox="0 0 133 32" style="display: block; margin: 2px 0px;"><path fill="#F0B41C" d="M30.6967273,1.13648485 L36.3810909,3.40945455 L36.3810909,23.8758788 C36.3810909,28.2705455 30.9507879,29.0424242 27.2853333,29.5602424 C29.3818182,29.0424242 30.7083636,28.4606061 30.6967273,23.8758788 L30.6967273,5.68436364 L25.0123636,3.40945455 L30.6967273,1.13648485 Z M6.82084848,28.4237576 L6.82084848,15.9204848 C6.82084848,14.6618182 7.76533333,13.238303 8.91151515,12.7476364 L14.7801212,10.2264242 L14.7801212,18.1779394 L20.4644848,21.6048485 C21.6106667,22.1866667 23.8758788,22.2002424 23.8758788,20.4664242 L23.8758788,17.0550303 L21.5990303,15.9166061 L21.5990303,1.56319402e-13 L4.26666667,6.38642424 C1.91030303,7.25333333 3.55271368e-15,9.98593939 3.55271368e-15,12.5071515 L3.55271368e-15,31.2669091 L6.82084848,28.4237576 Z"></path><g transform="translate(43.000000, 0.000000)" fill="#FFFFFF"><path d="M5.14521212,24.2224981 L1.33226763e-14,24.2224981 L1.33226763e-14,9.41134654 L4.75151515,9.41134654 L4.75151515,11.8937708 C5.43733518,11.0060378 6.29475204,10.2653615 7.27272727,9.71583139 C8.16188898,9.23817548 9.15699751,8.9920662 10.166303,9.00019502 C11.7333333,9.00019502 12.9221818,9.44948795 13.7328485,10.3480738 C14.5435152,11.2466597 14.9488485,12.5615688 14.9488485,14.2928011 L14.9488485,24.2224981 L9.83078788,24.2224981 L9.83078788,15.7376496 C9.83078788,14.961892 9.67175758,14.3755486 9.35369697,13.9786193 C9.03563636,13.58169 8.56436364,13.3877506 7.93987879,13.3968011 C7.04258586,13.3968011 6.35216162,13.6980536 5.86860606,14.3005587 C5.38505051,14.9030637 5.14391919,15.7803162 5.14521212,16.9323162 L5.14521212,24.2224981 Z"></path><path d="M27.8366061,9 L32.9507879,9 L32.9507879,22.6203636 L28.1992727,24.5190303 L28.1992727,21.6254545 C27.5124636,22.5143219 26.6553593,23.2573653 25.6780606,23.8111515 C24.7938668,24.2845189 23.8048332,24.5279425 22.8019394,24.5190303 C21.2323232,24.5190303 20.0402424,24.0665051 19.225697,23.1614545 C18.4111515,22.256404 18.0025859,20.9408485 18,19.2147879 L18,9 L23.1452121,9 L23.1452121,17.7796364 C23.1452121,18.5553939 23.3042424,19.1443232 23.622303,19.5464242 C23.9403636,19.9485253 24.4116364,20.1482828 25.0361212,20.145697 C25.9411717,20.145697 26.631596,19.8418586 27.1073939,19.2341818 C27.5831919,18.6265051 27.8243232,17.7524848 27.8307879,16.6121212 L27.8366061,9 Z"></path><polygon id="Path" points="38.7151515 24.5546667 36 24.5546667 36 1.088 38.7151515 1.15463195e-13"></polygon><path d="M41,17.0717576 C41,14.7263838 41.7453737,12.7947475 43.2361212,11.2768485 C44.7268687,9.75894949 46.6171313,9 48.9069091,9 C51.1966869,9 53.0869495,9.75894949 54.577697,11.2768485 C56.0684444,12.7947475 56.8138182,14.7263838 56.8138182,17.0717576 C56.8138182,19.4274747 56.0684444,21.3668687 54.577697,22.8899394 C53.0869495,24.4130101 51.1966869,25.1719596 48.9069091,25.1667879 C46.6261818,25.1667879 44.7385051,24.4078384 43.2438788,22.8899394 C41.7492525,21.3720404 41.0012929,19.4326465 41,17.0717576 Z M43.6957576,17.0717576 C43.6957576,18.9141818 44.172202,20.3965253 45.1250909,21.5187879 C46.0779798,22.6410505 47.327596,23.2028283 48.8739394,23.2041212 C50.4254545,23.2041212 51.6802424,22.6423434 52.638303,21.5187879 C53.5963636,20.3952323 54.0786263,18.9128889 54.0850909,17.0717576 C54.0850909,15.2422626 53.6028283,13.7657374 52.638303,12.6421818 C51.6737778,11.5186263 50.4189899,10.9574949 48.8739394,10.9587879 C47.3224242,10.9587879 46.0728081,11.5205657 45.1250909,12.6441212 C44.1773737,13.7676768 43.7009293,15.2435556 43.6957576,17.0717576 Z"></path><path d="M70.0824261,23.582303 C69.3285884,24.0285568 68.5220417,24.3790594 67.6814564,24.625697 C66.9065592,24.8487063 66.1042899,24.9622904 65.2979413,24.9631515 C63.1180625,24.9631515 61.3564463,24.2397576 60.0130928,22.7929697 C58.6697392,21.3461818 57.9987089,19.4449293 58.0000019,17.0892121 C58.0000019,14.6882424 58.7175776,12.739798 60.1527291,11.2438788 C61.5878807,9.7479596 63.4626281,9 65.7769716,9 C66.5067857,9.0106757 67.2345208,9.08072506 67.9529716,9.20945455 C68.7804463,9.34650505 69.737214,9.55725253 70.8232746,9.84169697 L72.745214,9.06593939 L72.745214,22.4283636 C72.745214,24.213899 72.6605271,25.520404 72.4911534,26.3478788 C72.3424597,27.1215145 72.0497022,27.860316 71.6281231,28.5258182 C70.9908577,29.4891385 70.0844202,30.2438287 69.0215776,30.696 C67.7834618,31.2231176 66.4474127,31.48094 65.1020625,31.4523636 C64.1335045,31.4523045 63.1689244,31.3284732 62.2317594,31.0838788 C61.252533,30.8239772 60.3068642,30.4510466 59.41382,29.9726061 L58.9696988,26.7512727 L60.9575776,28.0506667 C61.5573127,28.4240193 62.2116549,28.7014604 62.8969716,28.8729697 C63.6457641,29.0836796 64.4192481,29.1938978 65.1970928,29.2007273 C66.7486079,29.2007273 67.9516786,28.8128485 68.8063049,28.0370909 C69.6609312,27.2613333 70.0863049,26.1571717 70.0824261,24.7246061 L70.0824261,23.582303 Z M70.0824261,21.5595152 L70.0824261,12.0739394 C69.4432737,11.7542576 68.7741844,11.4983147 68.0848503,11.3098182 C67.4816476,11.1457578 66.859767,11.0603633 66.2346685,11.0557576 C64.581012,11.0557576 63.2499413,11.6117172 62.2414564,12.7236364 C61.2329716,13.8355556 60.7280827,15.3146667 60.7267897,17.1609697 C60.7267897,18.9348687 61.179315,20.3428687 62.0843655,21.3849697 C62.989416,22.4270707 64.2086483,22.9474747 65.7420625,22.9461818 C66.3845516,22.9385817 67.0221469,22.8332967 67.6329716,22.6339394 C68.4792669,22.3480186 69.2988853,21.9885027 70.0824261,21.5595152 L70.0824261,21.5595152 Z"></path><path d="M75,9 L77.8276364,9 L82.2649697,20.6363636 L87.1483636,9 L89.4504242,9 L82.3813333,25.3238788 L82.2649697,25.5546667 C81.1478788,28.0965657 80.2874343,29.9066667 79.6836364,30.9849697 L76.7415758,30.9849697 C77.3683498,30.3346009 77.9302011,29.6246546 78.4191515,28.8652121 C79.0313917,27.8817808 79.5750659,26.8572886 80.046303,25.7990303 L81.0004848,23.7452121 L75,9 Z"></path></g></svg>
      </nav>
      <div class="nds-flex nds-flex--column nds@sm-flex--row nds-flex-grow-1 Card nds-background--white nds-margin--x1">
        <div class="nds@sm-border-left--light-grey nds-w-100 nds@sm-w-33 nds-order-2 nds-padding--x3">
          <form class="Form">

            <h2 class="Form__heading">Job 324400</h2>

            <fieldset class="Form__section">
              <legend class="Form__section-heading">Job Information</legend>

              <label class="Label">Project
                  <span class="Label__help-text">Additional helpful text</span>
                  <input class="Input" placeholder="Project 128703" />
              </label>

              <label class="Label"> Project description
                  <span class="Label__help-text">Project description helps identify the project.</span>
                  <input class="Input" />
              </label>

              <label class="Label"> Project status
                  <select class="Select">
                      <option value="planned">Planned</option>
                      <option value="booked">Booked</option>
                  </select>
              </label>

              <label class="Label"> Item code
                  <input class="Input Input--error" value="WS2SB6" />
                  <span class="Input__error-text"><i class="Input__error-icon material-icons">error_outline</i> Item WS2SB6 does not exist.</span>
              </label>

              <label class="Label"> Eaches expected on job
                  <input class="Input" placeholder="2 000" />
              </label>

              <label class="Label"> Eaches remaining on project
                  <input class="Input" placeholder="18 000" disabled />
              </label>

              <fieldset>
                <legend class="Label"> Line Lead <span class="Label__requirement-text">(Optional)</span></legend>
                <label class="Checkbox">
                <input type="checkbox" class="Checkbox__input">
                    <span class="Checkbox__text" name="linelead">Christiaan Oostenburg </span>
                </label>
                <label class="Checkbox">
                    <input type="checkbox" class="Checkbox__input">
                    <span class="Checkbox__text" name="linelead">Matt Dunn </span>
                </label>
                <label class="Checkbox">
                    <input type="checkbox" class="Checkbox__input" disabled>
                    <span class="Checkbox__text" name="linelead">Clemens Park </span>
                </label>
                <label class="Checkbox">
                    <input type="checkbox" class="Checkbox__input" disabled>
                    <span class="Checkbox__text" name="linelead">Nikola Pejcic </span>
                </label>
              </fieldset>

              <fieldset>
                <legend class="Label">Reconcile</legend>
                <label class="Radio Radio--error">
                  <input type="Radio" name="reconcile" class="Radio__input">
                  <span class="Radio__text">Yes</span>
                </label>
                <label class="Radio Radio--error">
                  <input type="Radio" name="reconcile" class="Radio__input" checked>
                  <span class="Radio__text">No</span>
                </label>
                <label class="Radio">
                  <input type="Radio" name="reconcile" class="Radio__input" checked disabled>
                  <span class="Radio__text">Maybe</span>
                </label>
              </fieldset>

              <label class="Label">Job visibility</label>
              <label class="Toggle">
                <input type="checkbox" class="Toggle__input">
                <div class="Toggle__slider"></div>
                <span class="Toggle__text">Visible</span>
              </label>

            </fieldset>

            <fieldset class="Form__section">
              <legend class="Form__section-heading">Rejects</legend>
              <label class="Label"> Item
                  <input class="Input Input--error" value="235432" />
                  <span class="Input__error-text"><i class="Input__error-icon material-icons">error_outline</i> Item 235432 is not a valid entry.</span>
              </label>
              <label class="Label"> Quantity
                  <input class="Input" />
              </label>

              <label class="Label">Reject visbility</label>
              <label class="Toggle">
                <input type="checkbox" class="Toggle__input">
                <div class="Toggle__slider"></div>
                <span class="Toggle__text">Hidden</span>
              </label>
            </fieldset>

            <button class="PrimaryButton">Save job</button>

          </form>
        </div>
        <div class="nds-flex-grow-1 nds-order-1 nds-padding--x1">

         <h1 class="Title">I am a Title<h1>

         <h2 class="SectionTitle">Details</h2>

         <div class="nds-flex">

          <div class="nds-flex-grow-1">
            <p class="Label">Purchase Order Number</p>
            <p>7050007201911</p>
          </div>
          <div class="nds-flex-grow-1">
            <p class="Label">Purchase Order Number</p>
            <p>7050007201911</p>
          </div>
          <div class="nds-flex-grow-1">
            <p class="Label">Purchase Order Number</p>
            <p>7050007201911</p>
          </div>
         </div>

         <div class="nds-flex">
          <div class="nds-flex-grow-1">
            <p class="Label">Purchase Order Number</p>
            <p>7050007201911</p>
          </div>
          <div class="nds-flex-grow-1">
            <p class="Label">Purchase Order Number</p>
            <p>7050007201911</p>
          </div>
          <div class="nds-flex-grow-1">
            <p class="Label">Purchase Order Number</p>
            <p>7050007201911</p>
          </div>

         </div>

         <h2 class="SectionTitle">Production Records</h2>

         <table class="Table">
            <tr class="Table__row">
              <th class="Table__heading">Date</th>
              <th class="Table__heading">Expected Quantity</th>
              <th class="Table__heading">Actual Quantity</th>
            </tr>
            <tr class="Table__row">
              <td class="Table__cell">2019-10-01</td>
              <td class="Table__cell">2,025 eaches</td>
              <td class="Table__cell">1,800 eaches</td>
            </tr>
            <tr class="Table__row">
              <td class="Table__cell">2019-10-02</td>
              <td class="Table__cell">2,475 eaches</td>
              <td class="Table__cell">2,250 eaches</td>
            </tr>
            <tr class="Table__row">
              <td class="Table__cell">2019-10-03</td>
              <td class="Table__cell">2,475 eaches</td>
              <td class="Table__cell">1,425 eaches</td>
            </tr>
            <tr class="Table__row">
              <td class="Table__cell">2019-10-24</td>
              <td class="Table__cell">2,475 eaches</td>
              <td class="Table__cell">-</td>
            </tr>
        </table>

        <form>
          <h3 class="Form__section-heading">Comments</h3>
          <textarea class="Textarea" placeholder="Leave a comment..." rows="4"></textarea>
          <div class="nds-margin-top--x3">
            <button class="PrimaryButton">Comment</button>
            <button class="QuietButton">Cancel</button>
          </div>
        </form>

        </div>
      </div>
    </div>
`
);
