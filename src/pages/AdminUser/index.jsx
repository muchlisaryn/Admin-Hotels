import { Button, Sidebar } from "../../component";
import { colors } from "../../utils/colors";

export default function AdminUser() {
  return (
    <div className="d-flex ">
      <Sidebar />
      <div className="w-100">
        <div className="d-flex justify-content-between">
          <div>Wellcome Admin Budi</div>
          <div className="d-flex">
            <div>
              <Button title="Create User" color={colors.yellow} />
            </div>
          </div>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td className="d-flex">
                <div>
                  <Button title="edit" color={colors.yellow} />
                </div>
                <div>
                  <Button title="Hapus" color={colors.blue} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
