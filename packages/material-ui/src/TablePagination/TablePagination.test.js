import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import PropTypes from 'prop-types';
import {
  getClasses,
  createMount,
  describeConformance,
  fireEvent,
  createClientRender,
} from 'test/utils';
import TableFooter from '../TableFooter';
import TableCell from '../TableCell';
import TableRow from '../TableRow';
import TablePagination from './TablePagination';

describe('<TablePagination />', () => {
  const noop = () => {};
  let classes;
  const mount = createMount();
  const render = createClientRender();

  before(() => {
    classes = getClasses(
      <TablePagination count={1} onPageChange={noop} page={0} rowsPerPage={10} />,
    );
  });

  describeConformance(
    <TablePagination count={1} onPageChange={noop} page={0} rowsPerPage={10} />,
    () => ({
      classes,
      inheritComponent: TableCell,
      mount: (node) => {
        const wrapper = mount(
          <table>
            <tbody>
              <tr>{node}</tr>
            </tbody>
          </table>,
        );
        return wrapper.find('tr').childAt(0);
      },

      refInstanceof: window.HTMLTableCellElement,
      // can only use `td` in a tr so we just fake a different component
      testComponentPropWith: (props) => <td {...props} />,
    }),
  );

  describe('prop: labelDisplayedRows', () => {
    it('should use the labelDisplayedRows callback', () => {
      let labelDisplayedRowsCalled = false;
      function labelDisplayedRows({ from, to, count, page }) {
        labelDisplayedRowsCalled = true;
        expect(from).to.equal(11);
        expect(to).to.equal(20);
        expect(count).to.equal(42);
        expect(page).to.equal(1);
        return `Page ${page}`;
      }

      const { container } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={42}
                page={1}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
                labelDisplayedRows={labelDisplayedRows}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );
      expect(labelDisplayedRowsCalled).to.equal(true);
      expect(container.innerHTML.includes('Page 1')).to.equal(true);
    });
  });

  describe('prop: labelRowsPerPage', () => {
    it('labels the select for the current page', () => {
      const { getAllByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={1}
                page={0}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
                labelRowsPerPage="lines per page:"
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      // will be `getByRole('combobox')` in aria 1.2
      const [combobox] = getAllByRole('button');
      expect(combobox).toHaveAccessibleName('lines per page: 10');
    });

    it('accepts React nodes', () => {
      const { getAllByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={1}
                page={0}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
                labelRowsPerPage={
                  <React.Fragment>
                    <em>lines</em> per page:
                  </React.Fragment>
                }
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      // will be `getByRole('combobox')` in aria 1.2
      const [combobox] = getAllByRole('button');
      expect(combobox).toHaveAccessibleName('lines per page: 10');
    });
  });

  describe('prop: page', () => {
    it('should disable the back button on the first page', () => {
      const { getAllByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={11}
                page={0}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      const [, backButton, nextButton] = getAllByRole('button');
      expect(backButton).to.have.property('disabled', true);
      expect(nextButton).to.have.property('disabled', false);
    });

    it('should disable the next button on the last page', () => {
      const { getAllByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={11}
                page={1}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      const [, backButton, nextButton] = getAllByRole('button');
      expect(backButton).to.have.property('disabled', false);
      expect(nextButton).to.have.property('disabled', true);
    });
  });

  describe('prop: onPageChange', () => {
    it('should handle next button clicks properly', () => {
      let page = 1;
      const { getByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={30}
                page={page}
                onPageChange={(event, nextPage) => {
                  page = nextPage;
                }}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      const nextButton = getByRole('button', { name: 'Go to next page' });
      fireEvent.click(nextButton);
      expect(page).to.equal(2);
    });

    it('should handle back button clicks properly', () => {
      let page = 1;
      const { getByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={30}
                page={page}
                onPageChange={(event, nextPage) => {
                  page = nextPage;
                }}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      const backButton = getByRole('button', { name: 'Go to previous page' });
      fireEvent.click(backButton);
      expect(page).to.equal(0);
    });
  });

  describe('label', () => {
    it('should display 0 as start number if the table is empty ', () => {
      const { container } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={0}
                page={0}
                rowsPerPage={10}
                onPageChange={noop}
                onRowsPerPageChange={noop}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );
      expect(container.querySelectorAll('p')[1]).to.have.text('0-0 of 0');
    });

    it('should hide the rows per page selector if there are less than two options', () => {
      const { container, queryByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                page={0}
                rowsPerPage={5}
                rowsPerPageOptions={[5]}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                count={10}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      expect(container).to.not.include.text('Rows per page');
      expect(queryByRole('listbox')).to.equal(null);
    });
  });

  describe('prop: count=-1', () => {
    it('should display the "of more than" text and keep the nextButton enabled', () => {
      const Test = () => {
        const [page, setPage] = React.useState(0);
        return (
          <table>
            <TableFooter>
              <TableRow>
                <TablePagination
                  page={page}
                  rowsPerPage={10}
                  count={-1}
                  onPageChange={(_, newPage) => {
                    setPage(newPage);
                  }}
                />
              </TableRow>
            </TableFooter>
          </table>
        );
      };

      const { container, getByRole } = render(<Test />);

      expect(container).to.have.text('Rows per page:101-10 of more than 10');
      fireEvent.click(getByRole('button', { name: 'Go to next page' }));
      expect(container).to.have.text('Rows per page:1011-20 of more than 20');
    });
  });

  describe('prop: showFirstButton', () => {
    it('should change the page', () => {
      const handleChangePage = spy();
      const { getByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                showFirstButton
                page={1}
                rowsPerPage={10}
                count={98}
                onPageChange={handleChangePage}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      fireEvent.click(getByRole('button', { name: 'Go to first page' }));
      expect(handleChangePage.args[0][1]).to.equal(0);
    });
  });

  describe('prop: showLastButton', () => {
    it('should change the page', () => {
      const handleChangePage = spy();
      const { getByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                showLastButton
                page={0}
                rowsPerPage={10}
                count={98}
                onPageChange={handleChangePage}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      fireEvent.click(getByRole('button', { name: 'Go to last page' }));
      expect(handleChangePage.args[0][1]).to.equal(9);
    });
  });

  describe('warnings', () => {
    beforeEach(() => {
      PropTypes.resetWarningCache();
    });

    it('should raise a warning if the page prop is out of range', () => {
      expect(() => {
        PropTypes.checkPropTypes(
          TablePagination.Naked.propTypes,
          {
            classes: {},
            page: 2,
            count: 20,
            rowsPerPage: 10,
            onPageChange: noop,
            onRowsPerPageChange: noop,
          },
          'prop',
          'MockedTablePagination',
        );
      }).toErrorDev(
        'Material-UI: The page prop of a TablePagination is out of range (0 to 1, but page is 2).',
      );
    });
  });

  describe('prop: SelectProps', () => {
    it('does allow manual label ids', () => {
      const { getAllByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={1}
                page={0}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
                SelectProps={{ id: 'foo', labelId: 'bar' }}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      // will be `getByRole('combobox')` in aria 1.2
      const [combobox] = getAllByRole('button');
      expect(combobox).toHaveAccessibleName('Rows per page: 10');
    });
  });
});
